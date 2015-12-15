/// <reference path="../../node_modules/angular2/angular2.d.ts" />
import {Component, Injectable} from 'angular2/angular2';
import {Db} from './db';
import {createPiece, createPieceP, Piece, Pawn, Rook}from './dm.pieces'
import {Knight, Bishop, Queen , King} from './dm.pieces'
import {Mov, Point} from './dm.movs';

@Component({
    bindings: [Db]
})

@Injectable()
export class DM {
    users: Array<User>;
    user: User;
    games: Array<Game>;
    current_game: Game;
    constructor(public db: Db) {
        this.users = [];
        this.games = [];
        this.current_game = new Game();
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
        let self: DM = this;
        this.db.get_games(this.user)
            .subscribe((res: Array<Object>) => {
                res.map(g => {
                    self.games.push(new Game(self.user, g))
                })
                console.log('games loaded: ', this.games)
                if (self.games) {
                    this.current_game = this.games[0]
                }
            });
    }
    set_current_game(g:Game) {
            this.current_game = g;
    }
    isActiveGame(g:Game) {
        return this.current_game.id == g.id
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
    movs: Array<Mov>;
    limit: number;
    board: Board;
    constructor(user:User=null, obj: Object = { wplayer: null, bplayer: null, _id: '', limit: 0,
        movs: [] }) {
        this.wplayer = new User({
            _id: obj['wplayer'],
            alias: obj['wplayers'],
            elo: obj['wplayerElo'],
            photoUrl: ''
        })
        this.bplayer = new User({
            _id: obj['bplayer'],
            alias: obj['bplayers'],
            elo: obj['bplayerElo'],
            photoUrl: ''
        })
        this.id = obj['_id']
        this.limit = obj['limit']
        let playWhites:boolean = user ? user.id == this.wplayer.id : true;
        this.board = new Board(playWhites)
        this.movs = obj['movs'].map(obj => Mov.createFromStr(obj["mov"]))
        if (this.movs.length > 0) {
            this.board.logout(this)
            console.log(this.movs)
            for (var mov of this.movs) {
                this.board.move(mov);
            }
            this.board.logout(this)
        }
        
    }
}

export class Board {
    board: Array<Array<Cell>>;
    playWhites:boolean
    constructor(playWhites:boolean) {
        this.playWhites = playWhites;
        this.board = [[]];
        let row1 = [null];
        row1.push(createCell(1,1,'r'))
        row1.push(createCell(1,2,'n'))
        row1.push(createCell(1,3,'b'))
        row1.push(createCell(1,4,'q'))
        row1.push(createCell(1,5,'k'))
        row1.push(createCell(1,6,'b'))
        row1.push(createCell(1,7,'n'))
        row1.push(createCell(1,8,'r'))
        this.board.push(row1)

        let row2 = [null]
        for (var i = 1; i < 9; i++) {
            row2.push(createCell(2,i,'p'))
        }
        this.board.push(row2)

        for (var i = 3; i < 7; i++) {
            let row3 = [null]
            for (var j = 1; j < 9; j++) {
                row3.push(createCell(i,j,''))
            }
            this.board.push(row3)
        }

        let row7 = [null]
        for (var i = 1; i < 9; i++) {
            row7.push(createCell(7,i,'P'))
        }
        this.board.push(row7)        

        let row8 = [null]
        row8.push(createCell(8,1,'R'))
        row8.push(createCell(8,2,'N'))
        row8.push(createCell(8,3,'B'))
        row8.push(createCell(8,4,'Q'))
        row8.push(createCell(8,5,'K'))
        row8.push(createCell(8,6,'B'))
        row8.push(createCell(8,7,'N'))
        row8.push(createCell(8,8,'R'))
        this.board.push(row8)

        console.log('new board created: ',this.board)
    }
    get(i:number, j:number): Cell {
        return this.board[i][j]
    }
    set(i:number, j:number, v:string) {
        this.get(i,j).set(v)
    }
    getP(p:Point): Cell {
        return this.board[p.row][p.col]
    }
    setP(where:Point, piece:Piece) {
        this.getP(where).setP(piece)
    }
    move(_mov:Mov) {
        for (var mov of _mov.movs) {
            let fromPiece = this.getP(mov.from).p;
            this.setP(mov.from, createPieceP(mov.from, ''))
            this.setP(mov.to, fromPiece)
        }
    }
    logout(game:Game) {
        console.log("Game ",game.wplayer.alias,'vs',game.bplayer.alias,'-----------------')
        for (var i = 1; i < 9; i++) {
            console.log(i, 
                game.board.get(i, 1).p.value, game.board.get(i,2).p.value,
                game.board.get(i, 3).p.value, game.board.get(i,4).p.value,
                game.board.get(i, 4).p.value, game.board.get(i,6).p.value,
                game.board.get(i, 7).p.value, game.board.get(i,8).p.value)
        }
    }
}

let createCell = function( i:number,j:number,value:string):Cell {
    return new Cell(i,j,value)
}
export class Cell {
    row: number;
    col: number;
    p: Piece;
    constructor(i:number, j:number, v:string) {
        this.p = createPiece(i,j,v)
        this.row = i;
        this.col = j;
    }
    set(v:string) {
        let newPiece = createPiece(this.row, this.col, v)
        this.p = newPiece
    }
    setP(p:Piece) {
        this.p = p;
        p.row = this.row;
        p.col = this.col;
    }
}


