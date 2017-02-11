import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { BottomNavbarComponent } from './../../components/bottom-navbar/bottom-navbar.component';

@Component({
    moduleId: module.id,
    selector: 'bottom-navitem',
    templateUrl: 'bottom-navitem.component.html',
    styleUrls: ['bottom-navitem.component.css'],
    inputs: ['icon', 'text', 'route'],
    outputs: ['onItemSelected']
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavitemComponent implements OnInit {

    id: number;
    icon: string;
    text: string;
    route: string;

    componentClass: string;
    itemWidthClass: string;
    onItemSelected: EventEmitter<number>;

    constructor(private router: Router, private ref: ChangeDetectorRef) {
        //console.log('parent', JSON.stringify(parent));
    }

    ngOnInit() {

        if (!this.text || this.text == '') {
            throw ('text property for bottom-navitem isn\'t set');
        }

        if (!this.icon || this.icon == '') {
            throw ('icon property for bottom-navitem isn\'t set');
        }

        this.onItemSelected = new EventEmitter<number>();
    }

    navigate(): void {
        if (this.route) {
            this.router.navigate([this.route]);
        }
        this.onItemSelected.emit(this.id);
    }

    setSelected(isSelected: boolean): void {
        this.componentClass = isSelected ? 'bottom-navitem-selected' : 'bottom-navitem';
        this.ref.detectChanges();
    }

    setSiblingCount(totalSiblings: number) {
        this.itemWidthClass = 'items' + totalSiblings.toString();
        this.ref.detectChanges();
    }
}