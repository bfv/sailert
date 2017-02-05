import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// nativescript
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { DrawerTransitionBase, SlideInOnTopTransition, PushTransition } from 'nativescript-telerik-ui/sidedrawer';
import { Page } from "ui/page";

@Component({
    moduleId: module.id,
    selector: 'mainpage',
    templateUrl: 'mainpage.component.html',
    styleUrls: ['mainpage.component.css'],
})
export class MainpageComponent implements OnInit, AfterViewInit {

    @ViewChild('drawer') public drawer: RadSideDrawerComponent;

    public sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private page: Page) {
        this.page.on('loaded', this.onPageLoaded, this);
    }

    ngOnInit() {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.drawer.sideDrawer.closeDrawer();
            }
        });

    }

    ngAfterViewInit() {

    }

    onPageLoaded() {
        this.sideDrawerTransition = new PushTransition();
    }

    openMenu() {
        console.log('open menu');
        //this.router.navigate(['/main/settings']);
        this.drawer.sideDrawer.toggleDrawerState();
    }


}