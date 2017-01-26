import { Action } from '@ngrx/store';


export class CourseActions {
    static SET: string = '[course] set';
}

export function courseReducer(state: number = 0, action: Action) {

    switch (action.type) {

        case CourseActions.SET:
            return action.payload;

        default:
            return state;
    }
}

