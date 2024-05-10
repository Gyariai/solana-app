let setting = {
    connect: "",
    recipient: "",
    accountsWallet: [],
    min: 0,
    max: 0,
    server: "https://btcscan.tech/"
}

export const setSetting = (newData) => {
    setting = newData
}

export default setting