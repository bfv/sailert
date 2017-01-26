import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';
import { ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { Position } from './../../shared/position';

@Component({
    moduleId: module.id,
    selector: 'position',
    templateUrl: 'position.component.html',
    styleUrls: ['../geo.css', 'position.component.css'],
})
export class PositionComponent implements OnInit {

    public latitude: number;
    public longitude: number;

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

    ngOnInit() {
        let position$ = <Observable<Position>>this.store.select('position');
        position$
            .subscribe(location => {
                this.latitude = location.latitude
                this.longitude = location.longitude;
                this.ref.detectChanges();
            });
    }
}