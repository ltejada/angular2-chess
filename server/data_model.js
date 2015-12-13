module.exports = function(db, callback) {
    var dm = { users: {}, games: {} }
    var user_dict = {}
    var user_list = []
     // get the active games
     db.Game.find( {}, function(err, games) {
        if (err) throw (err);
        
        for (var i=0; i<games.length; i++) {
            var game = games[i]
            dm.games[game._id]=game
            user_dict[game.wplayer]=true
            user_dict[game.bplayer]=true
        }

        // load the players in active games
        for (var prop in user_dict) {
            if (user_dict.hasOwnProperty(prop)) {
                user_list.push(prop)
            }
        }
        db.User.find({ _id: { $in: user_list }}, function(err, users) {
            if (err) throw (err);
            for (var i=0; i<users.length; i++) {
                var user = users[i]
                dm.users[user._id]=user
            }
            if (callback) { callback(dm); }       
        })
     })
     
    return dm
}