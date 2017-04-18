import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { BottomNavbarComponent } from './../../components/bottom-navbar/bottom-navbar.component';

@Component({
    inputs: ['icon', 'text', 'route'],
    moduleId: module.id,
    outputs: ['onItemSelected'],
    selector: 'bottom-navitem',
    styleUrls: ['bottom-navitem.component.css'],
    templateUrl: 'bottom-navitem.component.html',
})
export class BottomNavitemComponent implements OnInit {

    public id: number;
    public icon: string;
    public text: string;
    public route: string;

    public componentClass: string;
    public itemWidthClass: string;
    public onItemSelected: EventEmitter<number>;

    constructor(private router: Router, private ref: ChangeDetectorRef) {
        // console.log('parent', JSON.stringify(parent));
    }

    public ngOnInit() {

        if (!this.text || this.text == '') {
            throw new Error('text property for bottom-navitem isn\'t set');
        }

        if (!this.icon || this.icon == '') {
            throw new Error('icon property for bottom-navitem isn\'t set');
        }

        this.onItemSelected = new EventEmitter<number>();
    }

    public navigate(): void {
        if (this.route) {
            this.router.navigate([this.route]);
        }
        this.onItemSelected.emit(this.id);
    }

    public setSelected(isSelected: boolean): void {
        this.componentClass = isSelected ? 'bottom-navitem-selected' : 'bottom-navitem';
        this.ref.detectChanges();
    }

    public setSiblingCount(totalSiblings: number) {
        this.itemWidthClass = 'items' + totalSiblings.toString();
        this.ref.detectChanges();
    }
}
