import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app",
    templateUrl: "./app/app.html",
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.log("Application component initialized ...");
    }
}