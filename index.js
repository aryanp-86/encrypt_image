


const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001
var eccrypto = require("eccrypto");

var privateKeyB = eccrypto.generatePrivate();
var publicKeyB = eccrypto.getPublic(privateKeyB);

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/encrypt-image', (req, res) => {
    // Encrypting the message for B.
    const data = req.body;
    eccrypto.encrypt(publicKeyB, Buffer.from(`${data}`)).then(function (encrypted) {
        // B decrypting the message
        console.log(encrypted);
        res.status(200).json({ data: encrypted });
        // eccrypto.decrypt(privateKeyB, encrypted).then(function (plaintext) {
        //     console.log("Message to part B:", plaintext.toString());
        // });
    });
})

app.post('/decrypt-image', (req, res) => {
    // Encrypting the message for B.
    const dataEncrypted = req.body;
    eccrypto.decrypt(privateKeyB, encrypted).then(function (plaintext) {
        console.log("Decrypted image", plaintext.toString());
        res.status(200).json({ data: dataEncryptedncrypted });
    });

})

app.listen(port, () => {
    console.log(`Encryption server listening on port ${port}`)
})