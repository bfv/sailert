import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';

import { Observable, Subscription } from 'rxjs';
import { Position } from './../../shared/position';

@Component({
    moduleId: module.id,
    selector: 'position',
    styleUrls: ['../geo.css', 'position.component.css'],
    templateUrl: 'position.component.html',
})
export class PositionComponent implements OnInit, OnDestroy {

    public latitude: number;
    public longitude: number;
    private position$Sub: Subscription;

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

    public ngOnInit() {
        const position$ = <Observable<Position>> this.store.select('position');
        this.position$Sub = position$
            .subscribe(location => {
                this.latitude = location.latitude;
                this.longitude = location.longitude;
                this.ref.detectChanges();
            });
    }

    public ngOnDestroy() {
        this.position$Sub.unsubscribe();
    }
}
