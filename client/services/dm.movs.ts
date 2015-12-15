
let A_code = "A".charCodeAt(0);

export function col2Str(j:number):string {
    return String.fromCharCode(A_code + j - 1);
}

export function str2Col(strPoint):number {
    return strPoint.charCodeAt(0) - A_code + 1;
}

export class Mov {
    _from: Point;
    _to: Point;
    constructor(from:Point, to:Point) {
        this._from = from;
        this._to = to
    }
    get from():Point {
        return this._from;
    }
    get to():Point {
        return this._to
    }
    get movs():Array<Mov> {
        return [this]
    }
    static createFromInter(i0:number,j0:number,i1:number,j1:number) {
        return new Mov( new Point(i0, j0), new Point(i1, j1))
    }
    static createFromStr(strMov) {
        if (strMov.length == 4) {        // A2A4
            return new Mov( Point.createFromStr(strMov.substr(0,2)),
                            Point.createFromStr(strMov.substr(2,2)))
        } else if (strMov.length == 6) { // A2A4xN
            return new Promotion( Point.createFromStr(strMov.substr(0,2)),
                                  Point.createFromStr(strMov.substr(2,2)),
                                  strMov.charAt(5)) 
        } else if (strMov.length == 9) { // A2A4:B2B4
            return new Castling( Point.createFromStr(strMov.substr(0,2)),
                                 Point.createFromStr(strMov.substr(2,2)),
                                 Point.createFromStr(strMov.substr(5,2)),
                                 Point.createFromStr(strMov.substr(7,2)))
        } else {
            return null;
        }
    }
    toString():string {
        return this._from.toString()+this._to.toString()
    }
}

export class Promotion extends Mov {
    piece: string;
    constructor(from: Point, to:Point, piece:string) {
        super(from, to)
        this.piece = piece
    }
    toString():string {
        return super.toString() + "x" + this.piece;
    }
}

export class Castling extends Mov {
    m1: Mov;
    m0: Mov;
    constructor(from0:Point, to0:Point, from1:Point, to1:Point) {
        super(from0, to0);
        this.m0 = new Mov(from0, to0);
        this.m1 = new Mov(from1, to1);
    }
    get movs():Array<Mov> {
        return [this.m0, this.m1]
    }
    toString():string {
        return this.m0.toString()+":"+this.m1.toString()
    }
}

export class Point {
    row: number;
    col: number;
    constructor(i: number, j:number) {
        this.row = i;
        this.col = j;
    }
    toString() {
        return col2Str(this.col)+this.row.toString()
    }
    static createFromStr(strPoint) {
        return new Point(parseInt(strPoint.charAt(1)), str2Col(strPoint.charAt(0)));
    }
}