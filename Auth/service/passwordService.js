const bcrypt = require('bcrypt');

class passwordService {

    crypto(password) {  // будем шифровать пароли
        try {
            const saltRound = 7 // Сложность логики шифровки пароля

            const passwordCrypto = bcrypt.hash(password, saltRound) //Сама шифровка

            return passwordCrypto;

        }catch (err){
            next(err);

        }
    }

}

module.exports = new passwordService();