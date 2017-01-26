import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../store/appstate';
import { Observable } from 'rxjs';
import { SpeedActions } from './../store/speed.reducer';
import { CourseActions } from './../store/course.reducer';
import { PositionActions } from './../store/position.reducer';

import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'ui/enums';

@Injectable()
export class LocationService {

    private watchId: number = -1;

    constructor(private store: Store<AppState>) {
        console.log('geolocation.isEnabled()', geolocation.isEnabled());
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }

    startLocationReadings() {

        // if there's an active watchId do not create another watch
        if (this.watchId > 0) {
            return;
        }

        this.watchId = geolocation.watchLocation(
            location => {
                this.updateLocationData(location);
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

    updateLocationData(location) {

        console.log("updateLocationData, current heading: ", location.direction);

        this.store.dispatch({
            type: SpeedActions.SET,
            payload: location.speed
        });

        this.store.dispatch({
            type: CourseActions.SET,
            payload: location.direction
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