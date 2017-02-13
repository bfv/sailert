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
    private isRunning: boolean;
    private isRunning$Sub: Subscription;

    constructor(private locationService: LocationService, private store: Store<AppState>, private ref: ChangeDetectorRef) {

    }

    ngOnInit() {

        this.tracklog$ = <Observable<TrackPoint[]>>this.store.select('tracklog');
        this.tracklog$Sub = this.tracklog$
            .subscribe(track => {
                this.tracklog = track.reverse();
                this.ref.detectChanges();
            });

        this.isRunning$Sub = this.locationService.isRunning$
            .subscribe(running => {
                this.onRunningChanged(running);
            });

    }

    ngOnDestroy() {
        this.tracklog$Sub.unsubscribe();
        this.isRunning$Sub.unsubscribe();
    }

    start(): void {
        if (!this.isRunning) {
            this.locationService.startLocationReadings();
        }
        else {
            this.locationService.stopLocationReadings();
        }
    }

    tap() {
        this.store.dispatch({
            type: TracklogActions.RESET,
            payload: null
        });
    }

    private onRunningChanged(running): void {
        this.isRunning = running;
        this.btnText = this.isRunning ? 'STOP' : 'START';
    }

}