/// <reference path="../../node_modules/angular2/angular2.d.ts" />
import {Component, Injectable} from 'angular2/angular2';
import {Db} from './db';

@Component({
    bindings: [Db]
})

@Injectable()
export class DM {
    users: Array<User>;
    user: User;
    games: Array<Game>;
    constructor(public db: Db) {
        this.users = [];
        this.games = [];
        let self: DM = this;
        this.db.get_users()
            .subscribe((res: Array<Object>) => {
                res.map( obj => {
                    self.users.push( new User(obj) )
                })
                console.log('users loaded: ', this.users)
            }
        )
        this.user = null;
    }
    set_user(user:User) {
        this.user = user;
    }
    load_games() {
        let self:DM = this;
        this.db.get_games(this.user)
            .subscribe((res: Array<Object>) => {
                res.map( g => {
                    self.games.push(new Game(g) )
                })
                console.log('games loaded: ', this.games)        
            })

    }
}

export class User {
    id: string;
    alias: string;
    elo: number;
    photoUrl: string
    constructor(obj:Object={ _id: '', alias: '', elo:0, photoUrl:''}) {
        this.id = obj["_id"]
        this.alias = obj["alias"]
        this.elo = obj["elo"]
        this.photoUrl = obj["photoUrl"]
    }
}

export class Game {
    id: string;
    wplayer: User;
    bplayer: User;
    movs: Movs;
    limit: number;
    constructor(obj: Object = { wplayer: null, bplayer: null, _id: '', limit: 0,
        movs: [] }) {
        this.wplayer = new User({
            id: obj['wplayer'],
            alias: obj['wplayers'],
            elo: obj['wplayerElo'],
            photoUrl: ''
        })
        this.bplayer = new User({
            id: obj['bplayer'],
            alias: obj['bplayers'],
            elo: obj['bplayerElo'],
            photoUrl: ''
        })
        this.id = obj['_id']
        this.limit = obj['limit']
        this.movs = new Movs(obj['movs'])
    }
}

export class Movs {
    movs: Array<Mov>
    constructor(strMovs:string) {
        this.movs = []
    }
}

export class Mov {
    strMov: string;
    constructor(strm: string) {
        this.strMov = strm
    }
}
