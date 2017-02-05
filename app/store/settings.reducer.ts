import { AppSettings } from './../shared/appsettings';
import { Action } from '@ngrx/store';
import { SpeedUnit } from './../shared/types';

export class SettingsActions {
    static SET_SPEEDUNITS: string = '[settings] set_speedunits';
}

export function settingsReducer(state: AppSettings = { speedUnits: 'kt' }, action: Action) {

    switch (action.type) {

        case SettingsActions.SET_SPEEDUNITS:
            return Object.assign({}, state, {
                speedUnits: action.payload
            });

        default:
            return state;
    }
}