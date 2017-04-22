import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { SwipeDirection, SwipeGestureEventData } from 'ui/gestures';
import { BottomNavbarComponent } from './../../modules/bottomnavbar/components/bottom-navbar/bottom-navbar.component';

@Component({
    moduleId: module.id,
    selector: 'mainpage',
    styleUrls: ['mainpage.component.css'],
    templateUrl: 'mainpage.component.html',
})
export class MainpageComponent implements OnInit {

    @ViewChild('navbar') private navbar: BottomNavbarComponent;

    constructor(private router: Router, private fonticon: TNSFontIconService) {
        // this.fonticon is necessary otherwise the service isn't initialized
    }

    public ngOnInit() {
        // empty
    }

    public onSwipe(args: SwipeGestureEventData) {

        if (args.direction == SwipeDirection.left) {
            this.navbar.nextItem();
        }
        else if (args.direction == SwipeDirection.right) {
            this.navbar.prevItem();
        }
    }

}
