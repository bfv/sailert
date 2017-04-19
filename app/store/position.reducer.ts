import { Action } from '@ngrx/store';
import { Position } from './../shared/position';

export class PositionActions {
    public static SET: string = '[position] set';
}

export function positionReducer(state: Position = { latitude: 0, longitude: 0 }, action: Action) {

    switch (action.type) {

        case PositionActions.SET:
            return action.payload;

        default:
            return state;
    }
}
