import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

@Component({
    moduleId: module.id,
    selector: 'mainpage',
    templateUrl: 'mainpage.component.html',
    styleUrls: ['mainpage.component.css'],
})
export class MainpageComponent implements OnInit {

    constructor(private router: Router, private fonticon: TNSFontIconService) {
        // this.fonticon is necessary otherwise the service isn't initialized
    }

    ngOnInit() {
    }

    openMenu() {
    }
}
