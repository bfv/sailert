import { Injectable } from '@angular/core';
import { AppSettings } from './../shared/appsettings';
import { Store } from '@ngrx/store';
import { AppState } from './../store/appstate';
import * as appSettings from "application-settings";
import { SettingsActions } from './../store/settings.reducer';
import { SpeedUnit } from './../shared/types';

@Injectable()
export class SettingsService {

    constructor(private store: Store<AppState>) {
        this.initializeSettings();
    }

    private initializeSettings() {
        let speedUnits = <SpeedUnit>appSettings.getString('speedunits', 'kt');
        this.setSpeedUnitsToStore(speedUnits);
    }

    public storeSettings(settings: AppSettings) {
        appSettings.setString('speedunits', settings.speedUnits);
    }

    public setSpeedUnits(units: SpeedUnit) {
        appSettings.setString('speedunits', units);
        this.setSpeedUnitsToStore(units);
    }

    private setSpeedUnitsToStore(units: SpeedUnit) {
        this.store.dispatch({
            type: SettingsActions.SET_SPEEDUNITS,
            payload: units
        });
    }

    save(settings: AppSettings) {
        this.store.dispatch({
            type: SettingsActions.SET_ALL,
            payload: settings
        });
        this.storeSettings(settings);
    }
}