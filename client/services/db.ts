/// <reference path="../../node_modules/angular2/angular2.d.ts" />
import {Component, provide, Injectable} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {User} from './dm';

@Injectable()
@Component({
    bindings: [Http]
})
export class Db {
    constructor(public http: Http) {  }
    get_users() {
        return this.http.get('/api/users')
            .map((res: Response) => res.json())
    }
    get_games(user: User) {
        return this.http.get('/api/games/'+user.id+'/all')
            .map((res: Response) => res.json())
    }
}