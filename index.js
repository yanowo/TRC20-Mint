const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "私鑰"; //
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

const blackHole = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb";  //黑洞地址
const memo = 'data:,{"p":"trc-20","op":"mint","tick":"trxi","amt":"1000"}';  

async function sendTransaction() {
    const unSignedTxn = await tronWeb.transactionBuilder.sendTrx(blackHole, 1); // 0.000001 TRX是最小轉帳金額。
    const unSignedTxnWithNote = await tronWeb.transactionBuilder.addUpdateData(unSignedTxn, memo, 'utf8');
    const signedTxn = await tronWeb.trx.sign(unSignedTxnWithNote);
    console.log("signed =>", signedTxn);
    const ret = await tronWeb.trx.sendRawTransaction(signedTxn);
    console.log("broadcast =>", ret);
}

async function main() {
    const numberOfTransactions = 50; // 指定要執行的次數
    for (let i = 0; i < numberOfTransactions; i++) {
        await sendTransaction();
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒的延遲
    }
	console.log(`Total: ${numberOfTransactions} tx`);
}

main()
    .then(() => {})
    .catch((err) => {
        console.log("錯誤:", err);
    });
