var eccrypto = require("eccrypto");

var privateKeyB = eccrypto.generatePrivate();
var publicKeyB = eccrypto.getPublic(privateKeyB);

// Encrypt
eccrypto.encrypt(publicKeyB, Buffer.from("Test message"))
    .then(encrypted => {
        console.log("Encrypted:", encrypted);

        // Decrypt
        return eccrypto.decrypt(privateKeyB, encrypted);
    })
    .then(decrypted => {
        console.log("Decrypted message:", decrypted.toString());
    })
    .catch(err => {
        console.error("Error:", err);
    });
