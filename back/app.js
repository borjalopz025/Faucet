const {Web3, eth} = require("web3")
const exp = require("express")
const fs = require("fs")
const cors = require("cors")

const web3 = new Web3("http://localhost:9900")
const app = exp();
app.use(cors())
const json = JSON.parse(fs.readFileSync("../nodo/data/keystore/UTC--2024-04-23T15-50-35.255628645Z--ca93282954be0ee489035ae65cbf2a0946377087").toString("utf-8"))


app.get("/faucet/:address", async (req, res) => {
    try {
        const account = await web3.eth.accounts.decrypt(json, 'borja');
        const recipientAddress = req.params.address;

        const tx = {
            chainId: 1234,
            to: recipientAddress,
            from: account.address,
            gas: '30000',
            gasPrice: '1000',
            value: web3.utils.toWei("0.1", 'ether')
        };
        const txSigned = await account.signTransaction(tx)
        const respuesta = await web3.eth.sendSignedTransaction(txSigned.rawTransaction)
        const receiptString = JSON.stringify(respuesta, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        res.send(receiptString)
    } catch (error) {
        console.log("hay un error"+error);
    }
});



app.get("/balance/:address", async (req, res) => {
    web3.eth.getBalance(req.params.address).then(saldo => {
        res.send(saldo.toString())
    } ).catch(err => {
        res.send(err)
    })
})

app.get("/block/:numberTransfer", async (req, res) => {
    const params = req.params.numberTransfer;

    try {
        const block = await web3.eth.getBlock(params);

        if (!block) {
            return res.status(404).send('No se encontró el bloque');
        }

        const transactionPromises = block.transactions.map((txHash, index) => {
            return web3.eth.getTransactionFromBlock(params, index);
        });

        const transactions = await Promise.all(transactionPromises);

        const dataBlock = {
            blockNumber: block.number,
            blockDate: new Date(Number(block.timestamp) * 1000),
            transactions: transactions.map(tx => ({
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: web3.utils.fromWei(tx.value, 'ether')
            }))
        }

        const dataBlockString = JSON.stringify(dataBlock, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );

        res.status(200).send(dataBlockString);

    } catch (error) {
        console.error("Se ha producido un error:", error);
        res.status(500).send('Error interno del servidor');
    }
});


app.listen(777,() =>{
    console.log("servidor desplegado");
})