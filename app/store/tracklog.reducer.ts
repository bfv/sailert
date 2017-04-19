import { Action } from '@ngrx/store';
import { TrackPoint } from './../shared/trackpoint';

export class TracklogActions {
    public static ADD: string = '[tracklog] add';
    public static RESET: string = '[tracklog] reset';
}

export function tracklogReducer(state: TrackPoint[] = [], action: Action) {

    switch (action.type) {

        case TracklogActions.ADD:
            return [...state, action.payload];

        case TracklogActions.RESET:
            return [];

        default:
            return state;
    }
}
