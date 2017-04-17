import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { SwipeGestureEventData, SwipeDirection } from 'ui/gestures';
import { BottomNavbarComponent } from './../../modules/bottomnavbar/components/bottom-navbar/bottom-navbar.component';

@Component({
    moduleId: module.id,
    selector: 'mainpage',
    templateUrl: 'mainpage.component.html',
    styleUrls: ['mainpage.component.css'],
})
export class MainpageComponent implements OnInit {

    @ViewChild('navbar') navbar: BottomNavbarComponent;

    constructor(private router: Router, private fonticon: TNSFontIconService) {
        // this.fonticon is necessary otherwise the service isn't initialized
    }

    ngOnInit() {
    }

    openMenu() {
    }

    onSwipe(args: SwipeGestureEventData) {
        console.log("Swipe Direction: " + args.direction);
        if (args.direction == SwipeDirection.left) {
            this.navbar.nextItem();
        }
        else if (args.direction == SwipeDirection.right) {
            this.navbar.prevItem();
        }
    }

}
