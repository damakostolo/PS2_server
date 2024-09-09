const sequelize = require("../dbAdmin");
const {DataTypes} = require('sequelize');

const User = sequelize.define("user", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:{type: DataTypes.STRING, unique: true},
    email:{type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activatedLink: {type: DataTypes.STRING},
})

const Favorite = sequelize.define("favorite", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FavoriteGame = sequelize.define("favorite_game", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Game = sequelize.define("game", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true},
    year:{type: DataTypes.INTEGER},
    img:{type: DataTypes.STRING, allowNull: false}
})

const GameInfo = sequelize.define("game_info", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.STRING, allowNull: false},
})

const Genre = sequelize.define('genre', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false, unique: true}
})

const Developer = sequelize.define("developer", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false, unique: true},
})

const Language = sequelize.define("language", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    language:{type: DataTypes.STRING, unique: true}
})

const Comments = sequelize.define("comments", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text:{type: DataTypes.STRING}
})

const LanguageGame = sequelize.define("language_game", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const GenreGame = sequelize.define("genre_game", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Favorite)
Favorite.belongsTo(User)
Favorite.hasOne(User)

User.hasMany(Comments)
Comments.belongsTo(User)

Favorite.hasMany(FavoriteGame)
FavoriteGame.belongsTo(Favorite)

FavoriteGame.hasOne(Game)
Game.belongsTo(FavoriteGame)
Game.hasOne(Favorite)

Genre.belongsToMany(Game, {through: GenreGame })
Game.belongsToMany(Genre, {through: GenreGame })

Developer.hasMany(Game)
Game.belongsTo(Developer)

Language.belongsToMany(Game, {through: LanguageGame })
Game.belongsToMany(Language, {through: LanguageGame })

Game.hasMany(GameInfo)
GameInfo.belongsTo(Game)

GameInfo.hasMany(Comments)
Comments.belongsTo(GameInfo)

module.exports = {
    User,
    Favorite,
    FavoriteGame,
    Game,
    GameInfo,
    Genre,
    Developer,
    Language,
    Comments
}