import { Action } from '@ngrx/store';
import { AppSettings } from './../shared/appsettings';
import { SpeedUnit } from './../shared/types';

export class SettingsActions {
    public static SET_SPEEDUNITS: string = '[settings] set_speedunits';
    public static SET_COORDINATESTYLE: string = '[settings] set_coordinatestyle';
    public static SET_ALL: string = '[settings] set_all';
}

export function settingsReducer(state: AppSettings = { speedUnits: 'kt', coordinateStyle: 'minutes' }, action: Action) {

    switch (action.type) {

        case SettingsActions.SET_SPEEDUNITS:
            return Object.assign({}, state, {
                speedUnits: action.payload,
            });

        case SettingsActions.SET_COORDINATESTYLE:
            return Object.assign({}, state, {
                coordinateStyle: action.payload,
            });

        case SettingsActions.SET_ALL:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
