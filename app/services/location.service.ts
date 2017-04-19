import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject , Observable, Subject } from 'rxjs';

import { AppState } from './../store/appstate';
import { CourseActions } from './../store/course.reducer';
import { PositionActions } from './../store/position.reducer';
import { SpeedActions } from './../store/speed.reducer';
import { TracklogActions } from './../store/tracklog.reducer';

import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'ui/enums';
import { Location } from './../shared/location';
import { Position } from './../shared/position';
import { TrackPoint } from './../shared/trackpoint';

@Injectable()
export class LocationService {

    public isRunning$: Subject<boolean>;

    private watchId: number = -1;
    private location$: Subject<Location>;

    constructor(private store: Store<AppState>) {

        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }

        this.location$ = new Subject<Location>();
        this.location$.subscribe(location => {
            this.updateLocationData(location);

        });

        // Observable.interval(5000)
        this.location$
            .throttleTime(5000)
            .subscribe(location => {
                this.updateTracklog(location);
            });

        this.isRunning$ = new BehaviorSubject(false);
    }

    public startLocationReadings() {

        // if there's an active watchId do not create another watch
        if (this.watchId > 0) {
            return;
        }

        // turn watchLocation into location$ Obeservable
        this.watchId = geolocation.watchLocation(
            location => {
                this.location$.next({
                    course: location.direction,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    speed: location.speed,
                    time: location.timestamp,
                });
            },
            error => {
                console.log('ERROR: ', JSON.stringify(error));
            },
            {
                desiredAccuracy: Accuracy.high,
                minimumUpdateTime: 1000,
                timeout: 10 * 1000,
            },
        );

        this.isRunning$.next(true);
    }

    public stopLocationReadings() {

        if (this.watchId > 0) {
            geolocation.clearWatch(this.watchId);
            this.resetLocationData();
            this.watchId = -1;
        }

        this.isRunning$.next(false);
    }

    public updateLocationData(location: Location) {

        this.store.dispatch({
            payload: location.speed,
            type: SpeedActions.SET,
        });

        this.store.dispatch({
            payload: location.course,
            type: CourseActions.SET,
        });

        this.store.dispatch({
            payload: this.getPosition(location),
            type: PositionActions.SET,
        });

    }

    public updateTracklog(location) {

        this.store.dispatch({
            payload: <TrackPoint> {
                position: this.getPosition(location),
                time: new Date(Date.now()),
            },
            type: TracklogActions.ADD,
        });
    }

    public resetLocationData() {
        this.store.dispatch({
            payload: 0,
            type: SpeedActions.SET,
        });

        this.store.dispatch({
            payload: 0,
            type: CourseActions.SET,
        });

        this.store.dispatch({
            payload: {
                latitude: 0,
                longitude: 0,
            },
            type: PositionActions.SET,
        });
    }

    private getPosition(location): Position {

        const position: Position = {
            latitude: location.latitude,
            longitude: location.longitude,
        };

        return position;
    }
}
