/// <reference path="../../../../node_modules/angular2/angular2.d.ts" />
import {Component, View, CORE_DIRECTIVES, AfterViewInit, EventEmitter } from 'angular2/angular2';
import {DM, Game} from '../../../services/dm';
import {GameButton} from './game-button/game-button';

@Component({
    selector: 'header-app',
    events: ['gameSelected']
})
@View({
    template: `
    <div class="row">
        <div class="col-xs-12">
            <button class="btn" aria-label='Main Menu'>
                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true">
                </span>
            </button>    
            <game-button *ngFor="#g of dm.games; #idx=index"
                         [game]="g"
                         (click)="selectGame(g)">
            </game-button>
        </div>
    </div>
    `, directives: [CORE_DIRECTIVES, GameButton]
})
export class HeaderApp {
    gameSelected: EventEmitter<Game>;
    constructor(public dm:DM) {
        this.gameSelected = new EventEmitter()
    }
    selectGame(g:Game, idx:number) {
        console.log('select the game :',g.wplayer.alias,'vs',g.bplayer.alias)
        this.gameSelected.next(g)
        this.dm.set_current_game(g)
    }
}

