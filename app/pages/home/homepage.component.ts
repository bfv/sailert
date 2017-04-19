import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LocationService } from './../../services/location.service';
import { TrackPoint } from './../../shared/trackpoint';
import { AppState } from './../../store/appstate';
import { TracklogActions } from './../../store/tracklog.reducer';

@Component({
    moduleId: module.id,
    selector: 'homepage',
    styleUrls: ['homepage.component.css'],
    templateUrl: 'homepage.component.html',
})
export class HomepageComponent implements OnInit, OnDestroy {

    public btnText: string = 'start';
    public tracklog$: Observable<TrackPoint[]>;
    public tracklog: TrackPoint[] = [];

    private isRunning: boolean;
    private isRunning$Sub: Subscription;
    private tracklog$Sub: Subscription;

    constructor(private locationService: LocationService, private store: Store<AppState>, private ref: ChangeDetectorRef) {

    }

    public ngOnInit() {

        this.tracklog$ = <Observable<TrackPoint[]>> this.store.select('tracklog');
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

    public ngOnDestroy() {
        this.tracklog$Sub.unsubscribe();
        this.isRunning$Sub.unsubscribe();
    }

    public start(): void {
        if (!this.isRunning) {
            this.locationService.startLocationReadings();
        }
        else {
            this.locationService.stopLocationReadings();
        }
    }

    public resetTracklog() {
        this.store.dispatch({
            payload: null,
            type: TracklogActions.RESET,
        });
    }

    private onRunningChanged(running): void {
        this.isRunning = running;
        this.btnText = this.isRunning ? 'STOP' : 'START';
    }

}
