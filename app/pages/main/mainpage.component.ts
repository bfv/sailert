import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// nativescript
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { DrawerTransitionBase, PushTransition } from 'nativescript-telerik-ui/sidedrawer';

@Component({
    moduleId: module.id,
    selector: 'mainpage',
    templateUrl: 'mainpage.component.html',
    styleUrls: ['mainpage.component.css'],
})
export class MainpageComponent implements OnInit {

    @ViewChild('drawerComponent') public drawerComponent: RadSideDrawerComponent;
    private drawer: SideDrawerType;
    private sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.sideDrawerTransition = new PushTransition();
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.drawer.closeDrawer();
            }
        });
    }

    openMenu() {
        this.drawer.toggleDrawerState();
    }
}
