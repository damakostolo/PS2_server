const ApiError = require("../../errors/ApiErrors");
const {GameInfo} = require("../../models/models")
const FileService = require("../service/fileService")


class GameController{

     createInfo = async (imgGame, linkGame , description , game, next) => { // Корочу создаём "игру" и сохраняем её надо запелить ещё наверное провер но она уже есть на уровне бд
        try {
            let arrImg = [];

            for(let i=0; i<imgGame.length; i++){ // старый добрый цыкл мне помог хвала небесам , а то уже готов был уебать этот монитор
                let name = FileService.uploadFile(imgGame[i]) // тут надо перебором ебануть все названия и сохранить их , и проблемма решена
                arrImg.push(name)
            }

            const gameInfo = await GameInfo.create({link:linkGame, description: description, gameId: game.id , imgGame: [...arrImg]})// Тут создаём инфу к игре
            return  gameInfo;
        }catch (err){
            next(ApiError.badRequest(err.message))
        }

    }
}

module.exports = new GameController();