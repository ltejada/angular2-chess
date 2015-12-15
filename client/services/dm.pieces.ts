import {Point} from './dm.movs';

export enum Color { White, Black, Empty };

export function createPieceP(p:Point, v:string): Piece {
    return createPiece(p.row, p.col, v);
}

export function createPiece(i:number, j:number, v:string): Piece {
    if (v == '') { return new Piece(i,j,Color.Empty)}
    if (v == 'p') { return new Pawn(i,j,Color.Black)}
    if (v == 'P') { return new Pawn(i,j,Color.White)}
    if (v == 'r') { return new Rook(i,j,Color.Black) }
    if (v == 'R') { return new Rook(i,j,Color.White)}
    if (v == 'n') { return new Knight(i,j,Color.Black) }
    if (v == 'N') { return new Knight(i,j,Color.White)}
    if (v == 'b') { return new Bishop(i,j,Color.Black) }
    if (v == 'B') { return new Bishop(i,j,Color.White)}
    if (v == 'q') { return new Queen(i,j,Color.Black) }
    if (v == 'Q') { return new Queen(i,j,Color.White)}
    if (v == 'k') { return new King(i,j,Color.Black) }
    if (v == 'K') { return new King(i,j,Color.White)}
}
export interface iPiece {
    row: number;
    col: number;
    color: Color;
    value: string;
}

class ValuesByColor {
    white: string;
    black: string;
    constructor(a: string, b:string) {
        this.white = a
        this.black = b
    }
    get(c:Color) {
        if (c==Color.White) { return this.white }
        if (c==Color.Black) { return this.black }
        if (c==Color.Empty) { return '.' } 
    }
}
export class Piece {
    row: number;
    col: number;
    color: Color;
    value: string;
    _values: ValuesByColor;
    constructor(i: number, j: number, c: Color) {
        this._set_values()
        this.value = this._values.get(c)
    }
    _set_values() {
        this._values = new ValuesByColor('','')
    }
}

export class Pawn extends Piece {
    _set_values() {
        this._values = new ValuesByColor('P','p')
    }
}

export class Rook extends Piece {
    _set_values() {
        this._values = new ValuesByColor('R','r')
    }
}


export class Knight extends Piece {
    _set_values() {
        this._values = new ValuesByColor('N','n')
    }

}


export class Bishop extends Piece {
    _set_values() {
        this._values = new ValuesByColor('B','b')
    }

}


export class Queen extends Piece {
    _set_values() {
        this._values = new ValuesByColor('Q','q')
    }

}


export class King extends Piece {
    _set_values() {
        this._values = new ValuesByColor('K','k')
    }

}
