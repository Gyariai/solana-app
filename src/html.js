export const Html = (connectStatus, state) => {
    const conects = document.querySelectorAll('[data-id="conteiner_connect"]')
    const connected = document.querySelectorAll('[data-id="conteiner_connected"]')
    const accounts = document.querySelectorAll('[data-id="account_wallet"]')

    if(connectStatus) {
        for(let section of connected) {
            section.style = ""
            Wallet(accounts, state)
        }
        for(let section of conects) {
            section.style = "display: none"
        }

    } else {
        for(let section of connected) {
            section.style = "display: none"
        }

        for(let section of conects) {
            section.style = ""
        }

        for(let account of accounts) {
            account.innerHTML = ""
        }
    }
}

const Wallet = (accounts, state) => { // отобрадение кошелька

    for(let account of accounts) {
        let acc = ""
        if(state.accountsWallet.length === 1) { // кошель unisat
            acc = state.accountsWallet[0].address
        } else {
           
            state.accountsWallet.forEach(value => {
              
                if(value.type === "p2tr" || value.type === "ordinals") acc = value.address
            });
        }
    
        account.innerHTML = SliceAccount(acc)

    }
}

const SliceAccount = (address) => {
    let add = address.slice(0, 7) + " ... " + address.slice(address.length - 3, address.length)

    return add
} 


export function SpinnerHtml(status, innerText) {
    const spiners = document.querySelectorAll('[data-id="spinner"]')
  
    for(let spiner of spiners) {
        if(status) {
            spiner.style = ""
        } else {
            spiner.style = "display: none"
        }
    }

    const spinersTexts = document.querySelectorAll('[data-id="spinner_text"]')
  
    for(let text of spinersTexts) {

        if(status) {
            text.style = "display: none"
        } else {
            text.style = ""
        }
    }
}

/////////к как работает