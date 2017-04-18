import { AfterViewInit, Component, ContentChildren, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from 'ui/page';
import { BottomNavitemComponent } from './../bottom-navitem/bottom-navitem.component';

@Component({
    moduleId: module.id,
    selector: 'bottom-navbar',
    styleUrls: ['bottom-navbar.component.css'],
    templateUrl: 'bottom-navbar.component.html',
})
export class BottomNavbarComponent implements OnInit, AfterViewInit, OnDestroy {

    public navItems: BottomNavitemComponent[] = [];

    // @ViewChildren decorator doesn't work when the first child is ng-content
    @ContentChildren(BottomNavitemComponent) private contentItems: QueryList<BottomNavitemComponent>;
    private currentSelectedIndex: number;

    constructor(private page: Page, private router: Router) { }

    public ngOnInit() {
        // empty
    }

    public ngOnDestroy() {
        for (const item of this.navItems) {
            item.onItemSelected.unsubscribe();
        }
    }

    public ngAfterViewInit() {

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
            item.onItemSelected.subscribe((itemId) => {
                this.selectNavitem(itemId);
            });
        });

        // make selected route 'active'
        this.selectNavitem(initialSelected);
    }

    public selectNavitem(selectedIndex: number) {

        selectedIndex = selectedIndex % this.contentItems.length;

        for (const item of this.navItems) {
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
