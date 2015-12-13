var mongoose = require('mongoose')
var Schema = mongoose.Schema
module.exports = function(MONGO_URL) {
    mongoose.connect(MONGO_URL);
    return {
        User: mongoose.model('User', new Schema({
            alias: { type: String, required: true, unique: true },
            elo: Number,
            photoUrl: String
        })),
        Game: mongoose.model('Game', new Schema({
            created: { type: Date, required: true },
            wplayer: Schema.Types.ObjectId,
            wplayers: String,
            wplayerElo: Number,
            bplayer: Schema.Types.ObjectId,
            bplayers: String,
            bplayerElo: Number,
            limit: Number,
            movs: String,
            msgs: [{ msgId: String, msg:String }]
        })),
        Message: mongoose.model('Message', new Schema({
            gameId: Schema.Types.ObjectId,
            msgId: String,
            type: String,
            msg: String
        }))

    }
}