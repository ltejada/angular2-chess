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
        Game: mongoose.model('Partida', new Schema({
            created: { type: Date, required: true },
            wplayer: Schema.Types.ObjectId,
            wplayers: String,
            bplayer: Schema.Types.ObjectId,
            bplayers: String,
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