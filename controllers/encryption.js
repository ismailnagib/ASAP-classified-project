class Encryption {

    static passwordGenerator(password) {
        const crypto = require('crypto');
        const hash = crypto.createHmac('sha256', 'the password is secure').update(password).digest('hex');
        return hash;
    }
}

module.exports = Encryption