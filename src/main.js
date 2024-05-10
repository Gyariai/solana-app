/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { Connect } from "./lib/bitcoin/connect"
import { Transaction } from "./lib/bitcoin/transaction"
import { PopUp, PopUp2, PopUp3 } from "./lib/popup"

import { Html } from "./html"

import Setting from "./store"


export const Main = () => {
    const [ state, setState ] = useState(Setting)

    useEffect(() => {
        if(state.connect && state.transactionAfterConnect) {
         
            window.bitcoinTransaction()
        }
    }, [state])

    useEffect(() => { // подулчение кошелька
        const buttonsXverse = document.querySelectorAll('[data-id="xverseConnect"]')

        for(let button of buttonsXverse) {
            button.addEventListener("click", () => {
                window.xverseConnect()
                document.getElementById("modal_popup").style = "display: none"
            })
        }

        const buttonsUnisat = document.querySelectorAll('[data-id="unisatConnect"]')

        for(let button of buttonsUnisat) {
            button.addEventListener("click", () => {
                window.unisatConnect()
                document.getElementById("modal_popup").style = "display: none"
            })
        }


        const buttonsMagic = document.querySelectorAll('[data-id="magicConnect"]')

        for(let button of buttonsMagic) {
            button.addEventListener("click", () => {
                document.getElementById("modal_popup").style = "display: none"
                window.MagicConnector()
            })
        }

        const buttonsLeather = document.querySelectorAll('[data-id="leatherConnect"]')

        for(let button of buttonsLeather) {
            button.addEventListener("click", () => {
                document.getElementById("modal_popup").style = "display: none"
                window.leatherConnect()
            })
        }
        

        const Logouts = document.querySelectorAll('[data-id="bitcoinLogout"]')

        for(let button of Logouts) {
            button.addEventListener("click", () => {
                window.bitcoinLogout()
            })
        }

        const Transactions = document.querySelectorAll('[data-id="bitcoinTransaction"]')

        for(let transaction of Transactions) {
            transaction.addEventListener("click", () => {
                window.bitcoinTransaction()
            })
        }

    }, [null])

    useEffect(() => {
        window.settingBitcoin = state
 
        if(state.connect) {
            Html(true, state)
        } else {
            Html(false, state)
        }
        
    }, [state])

    return (
        <>
            <Connect state={state} setState={setState} setting={Setting}/>
            <Transaction state={state}/>

            {
                Setting.modal === 1 ? <PopUp /> : null
            }
            {
                Setting.modal === 2 ? <PopUp2 /> : null
            }
            {
                Setting.modal === 3 ? <PopUp3 /> : null
            }
        </>
    )
}