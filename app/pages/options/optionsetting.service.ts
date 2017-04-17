import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OptionsPageSettings } from './opionspagesettings';

@Injectable()
export class OptionsettingsService {

    public optionPageSettings: OptionsPageSettings;

    private optionSubject: Subject<string>;

    constructor() {
        // empty
    }


    public setOptionSettings(options: OptionsPageSettings): Subject<string> {
        this.optionPageSettings = options;
        this.optionSubject = new Subject();
        return this.optionSubject;
    }

    public setValue(newValue: string) {
        this.optionSubject.next(newValue);
    }
}

