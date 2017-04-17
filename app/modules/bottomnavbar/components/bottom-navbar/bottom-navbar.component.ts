import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ContentChildren, OnDestroy } from '@angular/core';
import { Page } from 'ui/page';
import { BottomNavitemComponent } from './../bottom-navitem/bottom-navitem.component';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'bottom-navbar',
    templateUrl: 'bottom-navbar.component.html',
    styleUrls: ['bottom-navbar.component.css']
})
export class BottomNavbarComponent implements OnInit, AfterViewInit, OnDestroy {

    // @ViewChildren decorator doesn't work when the first child is ng-content
    @ContentChildren(BottomNavitemComponent) contentItems: QueryList<BottomNavitemComponent>;
    navItems: BottomNavitemComponent[] = [];

    private currentSelectedIndex: number;

    constructor(private page: Page, private router: Router) { }

    ngOnInit() { }

    ngOnDestroy() {
        for (let item of this.navItems) {
            item.onItemSelected.unsubscribe();
        }
    }

    ngAfterViewInit() {

        let initialSelected: number = 0;

        this.contentItems.forEach((item, id, allItems) => {
            item.id = id;

            // find out if item's route is the selected one
            if (item.route == this.router.url) {
                initialSelected = item.id;
            }

            // help set the correct width in the navitem's
            item.setSiblingCount(this.contentItems.length);

            this.navItems.push(item);
            item.onItemSelected.subscribe(id => {
                this.selectNavitem(id);
            });
        });

        // make selected route 'active'
        this.selectNavitem(initialSelected);
    }

    public selectNavitem(selectedIndex: number) {

        selectedIndex = selectedIndex % this.contentItems.length;

        for (let item of this.navItems) {
            item.setSelected(item.id == selectedIndex);
        }
        this.currentSelectedIndex = selectedIndex;
    }

    public nextItem() {
        this.navItems[(this.currentSelectedIndex + 1) % this.contentItems.length].navigate();
    }

    public prevItem() {
        this.navItems[(this.currentSelectedIndex + this.contentItems.length - 1) % this.contentItems.length].navigate();
    }
}