import { Injectable } from '@angular/core';
import { AppSettings } from './../shared/appsettings';
import { Store } from '@ngrx/store';
import { AppState } from './../store/appstate';
import * as appSettings from "application-settings";
import { SettingsActions } from './../store/settings.reducer';
import { SpeedUnit, CoordinateStyle } from './../shared/types';

@Injectable()
export class SettingsService {

    private settings: AppSettings;

    constructor(private store: Store<AppState>) {
        this.initializeSettings();
    }

    private initializeSettings() {

        this.settings = new AppSettings();

        this.settings = {
            speedUnits: <SpeedUnit>appSettings.getString('speedunits', 'kt'),
            coordinateStyle: <CoordinateStyle>appSettings.getString('coordinatestyle', 'minutes')

        };
        this.pushSettingsToStore(this.settings);
    }

    // save all settings
    save(settings: AppSettings) {
        this.pushSettingsToStore(settings);
        this.persistSettings(settings);
    }

    // setting the individual settings is supported as well
    setSpeedUnits(units: SpeedUnit) {
        appSettings.setString('speedunits', units);
        this.pushSpeedUnitsToStore(units);
    }

    setCoordinateStyle(style: CoordinateStyle) {
        appSettings.setString('coordinatestyle', style);
        this.pushCoordinateStyleToStore(style);
    }

    private persistSettings(settings: AppSettings) {
        appSettings.setString('speedunits', settings.speedUnits);
        appSettings.setString('coordinatestyle', settings.coordinateStyle);
    }

    private pushSpeedUnitsToStore(units: SpeedUnit) {
        this.store.dispatch({
            type: SettingsActions.SET_SPEEDUNITS,
            payload: units
        });
    }

    private pushCoordinateStyleToStore(style: CoordinateStyle) {
        this.store.dispatch({
            type: SettingsActions.SET_COORDINATESTYLE,
            payload: style
        });
    }

    private pushSettingsToStore(settings: AppSettings) {
        this.store.dispatch({
            type: SettingsActions.SET_ALL,
            payload: settings
        });
    }
}