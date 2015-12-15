/// <reference path="../../../../../../node_modules/angular2/angular2.d.ts" />
import {Component, View, CORE_DIRECTIVES, AfterViewInit, Input} from 'angular2/angular2';
import {DM, Game} from '../../../../../services/dm';

@Component({
    selector: 'cell'
})
@View({
    template: `<div>{{ value }}</div>`,
    directives: [CORE_DIRECTIVES]
})


export class BoardCell implements AfterViewInit {
    @Input() crow: number;
    @Input() ccol: number;
    @Input() cgame: Game;
    value: string;
    constructor() {
        this.value = '';
    }
    ngAfterViewInit() {
        let cell =this.cgame.board.get(this.crow, this.ccol)
        this.value = cell.p.value
    }
    ngOnChanges(changes) {
        let old = this.value
        let cell = this.cgame.board.get(this.crow, this.ccol)
        this.value = cell.p.value
        // console.log('changing : ', this.crow, this.ccol,'from',old,'to',this.value, changes)
    }
}