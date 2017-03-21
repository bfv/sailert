import { Injectable } from '@angular/core';
import { OptionsPageSettings } from './opionspagesettings';

@Injectable()
export class OptionsettingsService {

    optionPageSettings: OptionsPageSettings;

    constructor() { }


    setOptionSettings(options: OptionsPageSettings) {
        this.optionPageSettings = options;
    }
}

