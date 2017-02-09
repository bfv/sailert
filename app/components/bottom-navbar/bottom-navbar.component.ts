import { Component, OnInit } from '@angular/core';
import { Page } from 'ui/page';

@Component({
    moduleId: module.id,
    selector: 'bottom-navbar',
    templateUrl: 'bottom-navbar.component.html',
    styleUrls: ['bottom-navbar.component.css']
})
export class BottomNavbarComponent implements OnInit {

    constructor(private page: Page) { }

    ngOnInit() {
        console.log('page defined: ', this.page != undefined);
    }
}