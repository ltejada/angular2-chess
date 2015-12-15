/// <reference path="../../../../../../node_modules/angular2/angular2.d.ts" />
import {Component, View, CORE_DIRECTIVES, AfterViewInit, Input} from 'angular2/angular2';
import {DM, Game} from '../../../../../services/dm';
import {BoardCell} from './board.cell';

@Component({
    selector: 'board'
})
@View({
    template: `
    <div class="row">
        <div class="col-xs-12">
            <table>
                <tr>
                    <th *ngFor="#h of header">
                        {{ h }}
                    </th>
                </tr>
                <tr *ngFor="#row of a_rows; #irow=index">
                    <td *ngFor="#col of a_cols; #icol=index"
                        [ngClass]="{ withborder: withBorder(irow, icol), 
                                     blackcell: isBlackCell(irow, icol) }">
                        <div *ngIf="icol > 0">
                            <cell [cgame]="bgame"
                                  [crow]="row + 1"
                                  [ccol]="icol">
                            </cell>
                        </div>
                        <div class="th-col"
                             *ngIf="icol == 0">
                            {{ row + 1 }}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    `,directives:[CORE_DIRECTIVES, BoardCell],
    styles: [`th { text-align: center; 
                    height: 2em; }
              td { width: 3em; 
                   height: 3em;
                   padding: 1px; }
              .th-col { text-align: center; }
              .withborder { border: solid 1px; 
                            margin: 1px;
                            text-align: center; }
              .blackcell { background-color: lightblue; }
    `]
})
export class Board  {
    @Input() bgame:Game;
    header: Array<string>;
    a_rows: Array<number>;
    a_cols: Array<number>;
    constructor() {
        this.header = ["", "a", "b", "c", "d", "e", "f", "g", "h"];
        this.a_rows = [];
        this.a_cols = [];
        for (var i = 0; i < 9; i++) {
            if (i < 8) {
                 this.a_rows.push(i);
            }
            this.a_cols.push(i);       
        }
    }
    ngOnChanges() {
        if (this.bgame) {
            if (this.bgame.board.playWhites) {
                this.header = ["", "a", "b", "c", "d", "e", "f", "g", "h"];
                this.a_rows = [];
                this.a_cols = [];
                for (var i = 0; i < 9; i++) {
                    if (i < 8) {
                        this.a_rows.push(i);
                    }
                    this.a_cols.push(i);
                }
            } else {
                this.header = ["", "h", "g", "f", "e", "d", "c", "b", "a"];
                this.a_rows = [];
                this.a_cols = [];
                for (var i = 8; i >= 0; i--) {
                    if (i < 8) {
                        this.a_rows.push(i);
                    }
                    this.a_cols.push(i);
                }
            }
        }
    }

    withBorder(row: number, col: number): boolean {
        return col > 0;
    }
    isBlackCell(i,j) {
        return j > 0 && ((i+j) % 2 ) == 0 
    }
}
