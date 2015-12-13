import {Component, View, CORE_DIRECTIVES, Input, AfterViewInit, EventEmitter} from 'angular2/angular2';
import {DM, User} from '../../../services/dm';

@Component({
    selector: 'login'
})
@View({
    template: `
    <div class="col-xs-12" *ngFor="#us of dm.users">
        <button class="btn" (click)="loginAs(us)" >Login as {{ us.alias }}</button>
    </div>
    `,
    directives: [CORE_DIRECTIVES]
})
export class Login {
    constructor(public dm: DM) {
    }
    loginAs(us: User) {
        this.dm.set_user(us)
        this.dm.load_games()
    }
}