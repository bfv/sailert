import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, ContentChildren, OnDestroy } from '@angular/core';
import { Page } from 'ui/page';
import { BottomNavitemComponent } from './../bottom-navitem/bottom-navitem.component';

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
    private subs: any[] = [];

    constructor(private page: Page) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        for (let item of this.navItems) {
            item.onItemSelected.unsubscribe();
        }
    }

    ngAfterViewInit() {

        this.contentItems.forEach((item, id, allItems) => {
            item.id = id;
            item.setSiblingCount(this.contentItems.length);
            this.navItems.push(item);
            item.onItemSelected.subscribe(id => {
                this.selectNavitem(id);
            });
        });

        // first select the BottomNavitemComponent with index 0
        this.selectNavitem(0);
    }

    public selectNavitem(selectedIndex: number) {
        for (let item of this.navItems) {
            item.setSelected(item.id == selectedIndex);
        }
    }
}