/*
 * Angular 2 decorators and services
 */
import {Component, View, CORE_DIRECTIVES, AfterViewInit} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {DM, User, Game} from '../../services/dm';
import {Login} from './login/login';
import {HeaderApp} from './header/header'
import {GameView} from './body/game/game-view';

/*
 * Angular Directives
 */
import {ROUTER_DIRECTIVES} from 'angular2/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app' // <app></app>
})
@View({
  template: `
  <div class="container" *ngIf="!dm.user">
    <login></login>
  </div>
  <div class="container" *ngIf="dm.user">
    <header-app (gameSelected)="game_selected($event)">
    </header-app>
    <game-view *ngIf="dm.games.length>0" [game]="getCurrentGame()">
    </game-view>
  </div>
  `, directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, Login, HeaderApp, GameView ]
})

export class App {
  current_game: Game;
  constructor(public dm: DM) { 
    this.current_game = this.dm.games[0]
  }
  game_selected(g:Game) {
    this.current_game = g
  }
  getCurrentGame() {
    if (!this.current_game ) {
      this.current_game = this.dm.games[0]
    }
    return this.current_game
  }
}

