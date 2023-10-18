


const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001
var eccrypto = require("eccrypto");

var privateKeyB = eccrypto.generatePrivate();
var publicKeyB = eccrypto.getPublic(privateKeyB);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/encrypt-image', (req, res) => {
    // Encrypting the message for B.
    const data = req.body.data;
    eccrypto.encrypt(publicKeyB, Buffer.from(`${data}`)).then(function (encrypted) {
        // B decrypting the message
        console.log(encrypted);
        res.status(200).json(encrypted);
        // eccrypto.decrypt(privateKeyB, encrypted).then(function (plaintext) {
        //     console.log("Message to part B:", plaintext.toString());
        // });
    });
})

app.post('/decrypt-image', (req, res) => {
    const dataEncrypted = {
        iv: Buffer.from(req.body.iv.data),
        ephemPublicKey: Buffer.from(req.body.ephemPublicKey.data),
        ciphertext: Buffer.from(req.body.ciphertext.data),
        mac: Buffer.from(req.body.mac.data)
    };

    eccrypto.decrypt(privateKeyB, dataEncrypted)
        .then(plaintext => {
            console.log("Decrypted image:", plaintext.toString());
            res.status(200).json({ data: plaintext.toString() });
        })
        .catch(error => {
            console.error("Decryption failed:", error);
            res.status(500).send("Decryption failed");
        });
});


app.listen(port, () => {
    console.log(`Encryption server listening on port ${port}`)
})
