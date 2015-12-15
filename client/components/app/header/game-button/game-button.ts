/// <reference path="../../../../../node_modules/angular2/angular2.d.ts" />
import {Component, View, CORE_DIRECTIVES, AfterViewInit, Input} from 'angular2/angular2';
import {DM} from '../../../../services/dm';

@Component({
    selector: 'game-button'
})
@View({
    template: `
    <button class="btn btn-primary"
            [ngClass]="{ whitecolor: isWhiteColor(), blackcolor: isBlackColor(), 
                         bactive: dm.isActiveGame(game) }">
        {{ name }}
    </button>`,
    directives: CORE_DIRECTIVES,
    styles: [`.whitecolor { color: white; }
              .blackcolor { color: black; }
              .bactive { font-size: large; }
    `]
})
export class GameButton implements AfterViewInit{
    @Input() game;
    name: string;
    _active: boolean;
    constructor(public dm: DM) {
        this.name = ""
    }
    ngAfterViewInit() {
        // this._active = this.sactive;
        if (this.game.wplayer.alias == this.dm.user.alias) {
            this.name = this.game.bplayer.alias
        } else {
            this.name = this.game.wplayer.alias
        }
    }
    ngOnChanges(changes) {
        if (changes.sactive) {
            this._active = changes.sactive.currentValue
            console.log('changing ',this.game.wplayer.alias, 'vs', this.game.bplayer.alias,'to',changes.sactive.currentValue)
        }
    }
    isBlackColor():boolean {
        return this .game.wplayer.alias == this.dm.user.alias
    }
    isWhiteColor():boolean {
        return this.game.bplayer.alias == this.dm.user.alias
    }
    isActive():boolean {
        return this.game.id == this.dm.current_game.id
    }
}