import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocationService } from './../../services/location.service';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';
import { TrackPoint } from './../../shared/trackpoint';
import { Observable } from 'rxjs';
import { TracklogActions } from './../../store/tracklog.reducer';


@Component({
    moduleId: module.id,
    selector: 'homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.css']
})
export class HomepageComponent implements OnInit {

    public running: boolean = false;
    public btnText: string = 'start';
    public tracklog$: Observable<TrackPoint[]>;
    public tracklog: TrackPoint[] = [];

    constructor(private locationService: LocationService, private store: Store<AppState>, private ref: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.tracklog$ = <Observable<TrackPoint[]>>this.store.select('tracklog');
        this.tracklog$.subscribe(track => {
            this.tracklog = track;
            this.ref.detectChanges();
        });

    }

    start(): void {
        if (!this.running) {
            this.locationService.startLocationReadings();
        }
        else {
            this.locationService.stopLocationReadings();
        }

        this.running = !this.running;
        this.btnText = this.running ? 'STOP' : 'START';
    }

    tap() {
        this.store.dispatch({
            type: TracklogActions.RESET,
            payload: null
        });
    }

}