/// <reference path="../../../../../node_modules/angular2/angular2.d.ts" />
import {Component, View, CORE_DIRECTIVES, AfterViewInit, Input} from 'angular2/angular2';
import {DM, Game} from '../../../../services/dm';
import {Board} from './board/board';

@Component({
    selector: 'game-view'
})
@View({
    template: `
    <div class="row">
        <div class="col-xs-10 centered">
            {{ game.wplayer.alias }} vs {{ game.bplayer.alias }}
        </div>
        <div class="col-xs-2">
            {{ movement }}
        </div>
    </div>
    <div class="row">
        <div class="col-xs-5">
            Timer({{game.wplayer.alias}})
        </div>
        <div class="col-xs-5">
            Timer({{game.wplayer.alias}})
        </div>
        <div class="col-xs-2">
            <button class="btn btn-primary"
                    (click)="Move(movement)">
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-10">
            <board [bgame]="game"
                   (movChanged)="movChange($event)">
            </board>
        </div>
        <div class="col-xs-2">
            Lists of Movs
            <ul>
                <li>m1</li>
                <li>m2</li>
                <li>m3</li>
            </ul>
        </div>
    </div>
    `,
        directives: [CORE_DIRECTIVES, Board],
    styles:['.centered { text-align: center; }']
})
export class GameView implements AfterViewInit {
    @Input() game;
    movement: string;
    constructor() {
        this.movement = 'TODO';
    }
    ngAfterViewInit() {

    }
    Move(movement) {
        console.log('Moving :', this.movement);
    }
    movChange(movStr) {
        this.movement = movStr;
    }
}

