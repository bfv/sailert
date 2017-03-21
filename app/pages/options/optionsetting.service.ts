import { Injectable } from '@angular/core';
import { OptionsPageSettings } from './opionspagesettings';
import { Subject } from 'rxjs';

@Injectable()
export class OptionsettingsService {

    optionPageSettings: OptionsPageSettings;

    private optionSubject: Subject<string>;

    constructor() { }


    setOptionSettings(options: OptionsPageSettings): Subject<string> {
        this.optionPageSettings = options;
        this.optionSubject = new Subject();
        return this.optionSubject;
    }

    setValue(newValue: string) {
        this.optionSubject.next(newValue);
    }
}

