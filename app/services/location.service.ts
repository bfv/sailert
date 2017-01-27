import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../store/appstate';
import { Subject } from 'rxjs';
import { SpeedActions } from './../store/speed.reducer';
import { CourseActions } from './../store/course.reducer';
import { PositionActions } from './../store/position.reducer';

import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'ui/enums';
import { Location } from './../shared/location';


@Injectable()
export class LocationService {

    private watchId: number = -1;
    private location$: Subject<Location>;

    constructor(private store: Store<AppState>) {

        console.log('geolocation.isEnabled()', geolocation.isEnabled());
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }

        this.location$ = new Subject<Location>();
        this.location$.subscribe(location => {
            this.updateLocationData(location);
        });
    }

    startLocationReadings() {

        // if there's an active watchId do not create another watch
        if (this.watchId > 0) {
            return;
        }

        // turn watchLocation into location$ Obeservable
        this.watchId = geolocation.watchLocation(
            location => {
                //this.updateLocationData(location);
                this.location$.next({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    speed: location.speed,
                    course: location.direction,
                    time: new Date(Date.now)
                });
            },
            error => {
                console.log('ERROR: ', JSON.stringify(error));
            },
            {
                desiredAccuracy: Accuracy.high,
                minimumUpdateTime: 1000,
                timeout: 10 * 1000
            }
        );
    }

    stopLocationReadings() {

        if (this.watchId > 0) {
            geolocation.clearWatch(this.watchId);
            this.resetLocationData();
            this.watchId = -1;
        }
    }

    updateLocationData(location: Location) {

        console.log("updateLocationData, current heading: ", location.course);

        this.store.dispatch({
            type: SpeedActions.SET,
            payload: location.speed
        });

        this.store.dispatch({
            type: CourseActions.SET,
            payload: location.course
        });

        this.store.dispatch({
            type: PositionActions.SET,
            payload: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        });
    }

    resetLocationData() {
        this.store.dispatch({
            type: SpeedActions.SET,
            payload: 0
        });

        this.store.dispatch({
            type: CourseActions.SET,
            payload: 0
        });

        this.store.dispatch({
            type: PositionActions.SET,
            payload: {
                latitude: 0,
                longitude: 0
            }
        });
    }
}