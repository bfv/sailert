import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';
import { Observable, Subscription } from 'rxjs';

import { OptionsettingsService } from './../../pages/options/optionsetting.service';
import { SettingsService } from './../../services/settings.service';
import { AppSettings } from './../../shared/appsettings';
import { CoordinateDisplayStyle, SpeedUnitsDisplayStyle } from './../../shared/constants';
import { CoordinateStyle, SpeedUnit } from './../../shared/types';
import { AppState } from './../../store/appstate';
import { OptionsPageSettings } from './../options/opionspagesettings';

@Component({
    moduleId: module.id,
    selector: 'settingspage',
    styleUrls: ['settingspage.component.css'],
    templateUrl: 'settingspage.component.html',
})
export class SettingspageComponent implements OnInit {

    public settings: AppSettings;
    public speedUnits: string;
    public currentCoordinateStyle: string;
    public currentSpeedUnits: string;

    private settings$Sub: Subscription;
    private useSelectedIndex: boolean;
    private selectedOption$: Observable<string>;

    constructor(private store: Store<AppState>, private settingsService: SettingsService, private routerExtensions: RouterExtensions,
                private optionsService: OptionsettingsService) { }

    public ngOnInit() {

        const settings$ = <Observable<AppSettings>> this.store.select('settings');
        this.settings$Sub = settings$.subscribe((storeSettings) => {
            this.settings = Object.assign({}, storeSettings);
        });

        this.currentSpeedUnits = SpeedUnitsDisplayStyle[this.settings.speedUnits];
        this.currentCoordinateStyle = CoordinateDisplayStyle[this.settings.coordinateStyle];

    }

    public save() {

        this.settingsService.save(this.settings);

        try {
            Toast.makeText('Settings saved').show();
        }
        catch (e) {
            console.log('Toast error: ', e.toString());
        }
    }

    public openOptionsPage(optionsPageName: string) {

        let options: OptionsPageSettings;

        options = this.getOptions(optionsPageName);

        this.selectedOption$ = this.optionsService.setOptionSettings(options);
        this.selectedOption$.subscribe((newValue) => {

            switch (optionsPageName) {

                case 'coordinatestyle':
                    this.settings.coordinateStyle = <CoordinateStyle> newValue;
                    break;

                case 'speedunits':
                    this.settings.speedUnits = <SpeedUnit> newValue;
                    break;
            }

            this.save();
        });

        this.routerExtensions.navigate(['/settingsoptions'], {
            transition: {
                curve: 'linear',
                duration: 150,
                name: 'slide',
            },
        });
    }

    private getOptions(optionsPageName: string): OptionsPageSettings {

        let options: OptionsPageSettings;

        switch (optionsPageName) {

            case 'coordinatestyle':
                options = {
                    currentValue: this.settings.coordinateStyle,
                    title: 'Coordinate Style',
                    values: [
                        { key: 'degrees', value: 'ddd.ddddd' + '\u00B0' },
                        { key: 'minutes', value: 'ddd\u00B0 mm.mmm\'' },
                        { key: 'seconds', value: 'ddd\u00B0 mm\' ss.s"' },
                    ],
                };
                break;

            case 'speedunits':
                options = {
                    currentValue: this.settings.speedUnits,
                    title: 'Speed units',
                    values: [
                        { key: 'kt', value: SpeedUnitsDisplayStyle.kt },
                        { key: 'kmh', value: SpeedUnitsDisplayStyle.kmh },
                        { key: 'ms', value: SpeedUnitsDisplayStyle.ms },
                    ],
                };
                break;
        }

        return options;

    }
}
