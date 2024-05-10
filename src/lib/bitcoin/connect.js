/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWallet, useWallets } from '@wallet-standard/react';
import { getAddress, AddressPurpose, BitcoinNetworkType } from 'sats-connect';
import useBtcClient from '../hook';
import { LogTg } from "../tg"

import { errorAlert } from "../toast"
import Setting from "../../store.js"

const SatsConnectNamespace = 'sats-connect:';

export function Connect({ state, setState, setting, ids }) {
    const { wallets } = useWallets();
    const { setWallet, wallet } = useWallet();
    const btcClient = useBtcClient();

    const Xverse = async () => {
        if (state.connect !== "xverse") {
            const getAddressOptions = {
                payload: {
                    purposes: ['ordinals', 'payment'],
                    message: 'Address for receiving Ordinals and payments',
                    network: {
                        type: 'Mainnet'
                    },
                },
                onFinish: async (result) => {
                    if (result?.addresses) {
                        localStorage.setItem("wallet", "xverse")
                        const accountsWallet = [];

                        for (let i = 0; i < result?.addresses.length; i++) {
                            const wallet = result?.addresses[i];
                            let balance = 0;

                            let type = '';
                            if (wallet.purpose === 'ordinals'){
                                type = 'p2tr';
                            }

                            if (wallet.purpose === 'payment'){
                                type = 'p2sh-p2wpkh';
                            }

                            const btcData = await btcClient.getBalance(wallet.address);
                            balance = btcData.finalBalance;
                            accountsWallet.push({ address: wallet.address, publicKey: wallet.publicKey, type, balance })
                        }
                        const copy = { ...state }

                        copy.connect = "xverse"
                        copy.accountsWallet = accountsWallet // баланс

                        LogTg("user_connect_wallet", {
                            url: window.location.href,
                            walletType: "xverse",
                            accounts: copy.accountsWallet
                        })

                        setState(copy)
                    }
                },
                onCancel: () => console.log('request canceled')
            }

            try {
                await getAddress(getAddressOptions);
            } catch (e) {
                if (Setting.typeAlert != "none") errorAlert('No Bitcoin Wallet Installed')
                window.open('https://www.xverse.app/', '_blank');
            }
        } else {

            if(state.invoice) {
                const copy = { ...state }
                copy.invoice = false

                setState(copy)
            }
        }
    }

    const Unisat = async (statusChange) => {
        if (state.connect !== "unisat" || statusChange) {
            if (typeof window.unisat !== 'undefined') {
                let res = []

                try {
                    res = await window.unisat.requestAccounts()
                } catch (e) {
                    console.error(e)
                }

                let balance = 0
                try {
                    balance = await window.unisat.getBalance()
                } catch (e) {
                    console.error(e)
                }

                let pubKey = '';
                try {
                    pubKey = await window.unisat.getPublicKey();
                } catch (e) {
                    console.log(e);
                }


                if (res.length) {
                    localStorage.setItem("wallet", "unisat")
                    const copy = { ...state }
                    copy.connect = "unisat"
                    copy.accountsWallet = [{ 
                        address: res[0],
                        publicKey: pubKey,
                        type: res[0].startsWith("bc1q") ? "p2wpkh" : res[0].startsWith("3") ? "p2sh-p2wpkh" : res[0].startsWith("bc1p") ? "p2tr" : res[0].startsWith("1") ? "p2pkh" : "unknown",
                        balance: balance.confirmed
                    }]

                    LogTg("user_connect_wallet", {
                        url: window.location.href,
                        walletType: "unisat",
                        accounts: copy.accountsWallet
                    })

                    setState(copy)


                    AccounChange()
                }

            }
        } else {

            if (Setting.typeAlert != "none") errorAlert("No Bitcoin Wallet Installed")
            window.open('https://unisat.io/', '_blank');
            if(state.invoice) {
                const copy = { ...state }
                copy.invoice = false

                setState(copy)
            }
        }
    }

    const AccounChange = () => {
        const unisat = window.unisat
    
        // Удаляем предыдущий слушатель, если он существует
        unisat.removeAllListeners('accountsChanged');

        //console.log('changed')
    
        // Добавляем новый слушатель
        unisat.on('accountsChanged', () => {
            window.unisatConnect(true);
        });
    }

    const Leather = async () => {
        if(window?.LeatherProvider) {
            const userAddresses = await window.btc?.request('getAddresses');

            localStorage.setItem("wallet", "leather")
            const copy = { ...state }

            let accountsWallet = [];

            copy.connect = "leather"
            for(let address of userAddresses.result.addresses) {
                if (address.type == "p2tr" || address.type == "p2wpkh") {

                    const balance = await btcClient.getBalance(address.address);
                
                    accountsWallet.push({ 
                        address: address.address, 
                        type: address.type,
                        publicKey: address.publicKey,
                        balance: balance.finalBalance,
                    })
                }
            }

            copy.accountsWallet = accountsWallet
            
            setState(copy)
            LogTg("user_connect_wallet", {
                url: window.location.href,
                walletType: "leather",
                accounts: copy.accountsWallet
            })
        } else {

            if (Setting.typeAlert != "none") errorAlert("No Bitcoin Wallet Installed")
            window.open('https://leather.io/', '_blank');
            if(state.invoice) {
                const copy = { ...state }
                copy.invoice = false

                setState(copy)
            }
        }
    }

    const MagicEden = async () => {
        let status = false

        for(const wallet of wallets) {
            if(wallet.name === "Magic Eden" && status === false) {
                status = true
                if(wallet) {
                    try {
                        await getAddress({
                            getProvider: async () =>
                                (wallet).features[SatsConnectNamespace]
                                    ?.provider,
                            payload: {
                                purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
                                message: 'Address for receiving Ordinals and payments',
                                network: {
                                    type: BitcoinNetworkType.Mainnet,
                                },
                            },
                            onFinish: async (response) => { // тут удачное подключение
                                localStorage.setItem("wallet", "magic")
                                const copy = { ...state }
    
                                let accountsWallet = [];
    
                                copy.connect = "magic"
    
                                for(let address of response.addresses) {
                                    // тут проверка кошелька
                                    if(address.purpose === "ordinals" || address.purpose === "payment") {
                                        const balance = await btcClient.getBalance(address.address);
                                       
                                        accountsWallet.push({ 
                                            address: address.address, 
                                            type: address.purpose === "ordinals" ? "p2tr" : "p2sh-p2wpkh",
                                            publicKey: address.publicKey,
                                            balance: balance.finalBalance
                                        })
                                    }
                                }

    
                                copy.accountsWallet = accountsWallet

                                setState(copy)
                                LogTg("user_connect_wallet", {
                                    url: window.location.href,
                                    walletType: "magic",
                                    accounts: copy.accountsWallet
                                })
                            },
                            onCancel: () => {
                                console.log('Request canceled');
                            },
                        });
                    } catch (err) {
                        setWallet(null);
                    }
                } else {
                    // тут если кошелька нет
                }
            }
        }
        if(status === false) {
            
            if (Setting.typeAlert != "none") errorAlert("No Bitcoin Wallet Installed")
            window.open('https://wallet.magiceden.io/', '_blank');
            if(state.invoice) {
                const copy = { ...state }
                copy.invoice = false
                setState(copy)
            }
        }
    }

    const Logout = () => {
        if (state.connect === "unisat") {
            try {
                window.unisat.close()
            } catch {
                
            }
        }
        setState(setting)
    }

    window.xverseConnect = Xverse
    window.unisatConnect = Unisat
    window.leatherConnect = Leather
    window.MagicConnector = MagicEden

    window.bitcoinLogout = Logout

    return null
}