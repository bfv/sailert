import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocationService } from './../../services/location.service';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';
import { TrackPoint } from './../../shared/trackpoint';
import { Observable, Subscription } from 'rxjs';
import { TracklogActions } from './../../store/tracklog.reducer';

@Component({
    moduleId: module.id,
    selector: 'homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

    public btnText: string = 'start';
    public tracklog$: Observable<TrackPoint[]>;
    private tracklog$Sub: Subscription;

    public tracklog: TrackPoint[] = [];

    constructor(private locationService: LocationService, private store: Store<AppState>, private ref: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.tracklog$ = <Observable<TrackPoint[]>>this.store.select('tracklog');
        this.tracklog$Sub = this.tracklog$.subscribe(track => {
            this.tracklog = track;
            this.ref.detectChanges();
        });
    }

    ngOnDestroy() {
        console.log('ngdestroy');
        this.tracklog$Sub.unsubscribe();
    }

    start(): void {
        if (!this.locationService.isRunning) {
            this.locationService.startLocationReadings();
        }
        else {
            this.locationService.stopLocationReadings();
        }

        this.btnText = this.locationService.isRunning ? 'STOP' : 'START';
    }

    tap() {
        this.store.dispatch({
            type: TracklogActions.RESET,
            payload: null
        });
    }

}