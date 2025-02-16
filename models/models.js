const sequelize = require("../dbAdmin");
const {DataTypes} = require('sequelize');

const User = sequelize.define("user", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login:{type: DataTypes.STRING, unique: true},
    email:{type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.JSON, defaultValue: "USER"},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activatedLink: {type: DataTypes.STRING},
    refreshToken: {type: DataTypes.TEXT}
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
    link:{type: DataTypes.TEXT, unicode: true},
    description:{type: DataTypes.TEXT, allowNull: false},
    imgGame:{type: DataTypes.JSON, allowNull: false}
})

const Genre = sequelize.define('genre', {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false, unique: true}
})

const Language = sequelize.define("language", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true}// изменил
})

const Platform = sequelize.define("platform", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, unique: true}// изменил
})

const Comments = sequelize.define("comments", {
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text:{type: DataTypes.STRING}
})


User.hasOne(Favorite)
Favorite.belongsTo(User)

User.hasMany(Comments)
Comments.belongsTo(User)

Favorite.hasMany(FavoriteGame)
FavoriteGame.belongsTo(Favorite)

Game.hasOne(FavoriteGame)
FavoriteGame.belongsTo(Game)

// Genre <-> Game (many-to-many)
Genre.belongsToMany(Game, { through: 'GameGenres' });
Game.belongsToMany(Genre, { through: 'GameGenres' });

// Language <-> Game (many-to-many)
Language.belongsToMany(Game, { through: 'GameLanguages' });
Game.belongsToMany(Language, { through: 'GameLanguages' });

// Platform <-> Game (many-to-many)
Platform.belongsToMany(Game, { through: 'GamePlatform' });
Game.belongsToMany(Platform, { through: 'GamePlatform' });

Game.hasMany(GameInfo, {as: 'info'})
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
    Language,
    Platform,
    Comments
}