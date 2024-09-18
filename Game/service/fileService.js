const path = require('path');
const uuid = require('uuid')

class FileService {

    uploadFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg'
            file.mv(path.resolve(__dirname, '..', '..',  'static', fileName)) // а тут мы сохраняем в выбранную папку
            return fileName;
            
        }catch (e){
            console.error(e);
        }
    }

}

module.exports = new FileService();