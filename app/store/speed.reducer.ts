
import { Action } from '@ngrx/store';


export class SpeedActions {
    static SET: string = '[speed] set';
}

export function speedReducer(state: number = 0.0, action: Action) {

    switch (action.type) {

        case SpeedActions.SET:
            return action.payload;

        default:
            return state;
    }
}