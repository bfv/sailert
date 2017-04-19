import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as appSettings from 'application-settings';

import { AppSettings } from './../shared/appsettings';
import { CoordinateStyle, SpeedUnit } from './../shared/types';
import { AppState } from './../store/appstate';
import { SettingsActions } from './../store/settings.reducer';

@Injectable()
export class SettingsService {

    private settings: AppSettings;

    constructor(private store: Store<AppState>) {
        this.initializeSettings();
    }

    // save all settings
    public save(settings: AppSettings) {
        this.pushSettingsToStore(settings);
        this.persistSettings(settings);
    }

    // setting the individual settings is supported as well
    public setSpeedUnits(units: SpeedUnit) {
        appSettings.setString('speedunits', units);
        this.pushSpeedUnitsToStore(units);
    }

    public setCoordinateStyle(style: CoordinateStyle) {
        appSettings.setString('coordinatestyle', style);
        this.pushCoordinateStyleToStore(style);
    }

    private initializeSettings() {

        this.settings = new AppSettings();

        this.settings = {
            coordinateStyle: <CoordinateStyle> appSettings.getString('coordinatestyle', 'minutes'),
            speedUnits: <SpeedUnit> appSettings.getString('speedunits', 'kt'),

        };
        this.pushSettingsToStore(this.settings);
    }

    private persistSettings(settings: AppSettings) {
        appSettings.setString('speedunits', settings.speedUnits);
        appSettings.setString('coordinatestyle', settings.coordinateStyle);
    }

    private pushSpeedUnitsToStore(units: SpeedUnit) {
        this.store.dispatch({
            payload: units,
            type: SettingsActions.SET_SPEEDUNITS,
        });
    }

    private pushCoordinateStyleToStore(style: CoordinateStyle) {
        this.store.dispatch({
            payload: style,
            type: SettingsActions.SET_COORDINATESTYLE,
        });
    }

    private pushSettingsToStore(settings: AppSettings) {
        this.store.dispatch({
            payload: settings,
            type: SettingsActions.SET_ALL,
        });
    }
}
