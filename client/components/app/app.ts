/*
 * Angular 2 decorators and services
 */
import {Component, View, CORE_DIRECTIVES, AfterViewInit} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {DM, User} from '../../services/dm';
import {Login} from './login/login';

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
    <div class="row">
      <div class="col-xs-12">
        Hello World !
        <!--app-header></app-header-->
      </div>
      <div class="col-xs-12">
        <!--app-body></app-body-->
        users: {{ dm.users.length }}
      </div>
      <div class="col-xs-12" *ngFor="#game of dm.games">
          {{ game.wplayer.alias }} vs {{ game.bplayer.alias }}
      </div>
  </div>
  `, directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, Login ]
})

export class App {
  
  constructor(public dm: DM) { 
    
  }
}

