import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

@Component({
    moduleId: module.id,
    selector: 'bottom-navitem',
    templateUrl: 'bottom-navitem.component.html',
    styleUrls: ['bottom-navitem.component.css'],
    inputs: ['icon', 'text', 'route']
})
export class BottomNavitemComponent implements OnInit {

    icon: string;
    text: string;
    route: string;

    constructor(private routerExtensions: RouterExtensions) { }

    ngOnInit() {

    }

    navigate() {
        if (this.route) {
            this.routerExtensions.navigate([this.route], {
                transition: {
                    name: "slideBottom",
                    duration: 2000,
                    curve: "linear"
                }
            });
        }
    }
}