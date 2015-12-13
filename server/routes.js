module.exports = function(express, db, dm) {
    var router = express.Router();
    var util = require('util')
    // console.log("express -------------")
    // console.log(express)
    // console.log("db -------------")
    // console.log(db)
    console.log("router -------------")
    console.log(router)


    // ---------------- Users -----------------------------------------
    router.get('/users', function(req, res) {
        console.log('get: /users')
        db.User.find({}, function(err, users) {
            if (err) throw (err);
            return res.json(users)
        })
    })
    router.post('/users', function(req, res) {
        console.log('post: /users');
        var new_user = new db.User({
            alias: req.body.alias, 
            elo: parseInt(req.body.elo),
            photoUrl: req.body.photoUrl 
        })
        new_user.save(function(err, user) {
            if (err) throw (err);
            return res.json(user)
        })
    })
    router.get('/users/:id', function(req, res) {
        console.log('get: /users/'+req.params.id)
        db.User.findById(req.params.id, function(err, user) {
            if (err) throw (err);
            return res.json(user)
        })
    })

    // ---------------- Games ----------------------------------------

    router.get('/games/:userId/all', function(req, res) {
        console.log('get: /games/'+req.body.userId+'/all')
        db.Game.find(
            { $or: [ { wplayer: req.params.userId },
                     { bplayer: req.params.userId }
             ]},
            function(err, games) {
                if (err) throw (err);
                res.json(games)
            }
        );
    })
    router.post('/games', function(req, res) {
        console.log('post: /games')
        console.log(util.inspect(req.body))
        // find white and black players
        db.User.findById(req.body.wplayer, function(err, wplayer) {
            if (err) {
                res.json({ error: 'cant find player '+req.body.wplayer })
            } else {
                db.User.findById(req.body.bplayer, function(err, bplayer) {
                    if (err) {
                        res.json({ error: 'cant find bplayer '+req.body.bplayer })
                    } else {
                        var new_game = new db.Game({
                            created: new Date(),
                            wplayer: wplayer._id,
                            wplayers: wplayer.alias,
                            bplayer: bplayer._id,
                            bplayers: bplayer.alias,
                            movs: [],
                            msgs: [] });
                        new_game.save(function (err, game) {
                            if (err) throw (err);
                            res.json(game)
                        })
                        if (!dm.users[wplayer._id]) {
                            dm.users[wplayer._id]=wplayer
                        }
                        if (!dm.users[bplayer._id]) {
                            dm.users[bplayer._id]=wplayer
                        }
                        dm.games[new_game._id]=new_game
                        console.log(util.inspect(dm))
                    }
                })
            }
        })
    })

    return router
}
// users: ----------------------------------
// luis:           566d6a5fe6f4aeaa263624f2
// conchi:         566d6a6ae6f4aeaa263624f3
//
// Games: ----------------------------------
// luis vs conchi: 566d6b310c2c75c126adf34e
