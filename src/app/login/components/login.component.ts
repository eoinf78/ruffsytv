import {Router, RouterModule} from "@angular/router";
import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'login',
    templateUrl: './app/login/components/login.component.html'
})

export class LoginComponent {

    constructor(private router: Router) {
    }

    loginUser() {
        console.log(this.router.url);
        this.router.navigate(['/vidplayer']);
    }
}
