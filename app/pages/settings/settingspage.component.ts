import { Component, OnInit } from '@angular/core';
import { AppSettings } from './../../shared/appsettings';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';
import { SettingsService } from './../../services/settings.service';
import * as Toast from 'nativescript-toast';
import { OptionsPageSettings } from './../options/opionspagesettings';
import { OptionsettingsService } from './../../pages/options/optionsetting.service';

import { Router } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { SpeedUnit, CoordinateStyle } from './../../shared/types';
import { CoordinateDisplayStyle, SpeedUnitsDisplayStyle } from './../../shared/constants';

@Component({
    moduleId: module.id,
    selector: 'settingspage',
    templateUrl: 'settingspage.component.html',
    styleUrls: ['settingspage.component.css']
})
export class SettingspageComponent implements OnInit {

    public settings: AppSettings;
    public speedUnits: string;
    public currentCoordinateStyle: string;
    public currentSpeedUnits: string;

    private settings$Sub: Subscription;
    private useSelectedIndex: boolean;
    private selectedOption$: Observable<string>;

    constructor(private store: Store<AppState>, private settingsService: SettingsService, private routerExtensions: RouterExtensions, private optionsService: OptionsettingsService) { }

    ngOnInit() {

        let settings$ = <Observable<AppSettings>>this.store.select('settings');
        this.settings$Sub = settings$.subscribe(storeSettings => {
            this.settings = Object.assign({}, storeSettings);
        });

        this.currentSpeedUnits = SpeedUnitsDisplayStyle[this.settings.speedUnits];
        this.currentCoordinateStyle = CoordinateDisplayStyle[this.settings.coordinateStyle];

    }

    save() {

        this.settingsService.save(this.settings);

        try {
            Toast.makeText('Settings saved').show();
        }
        catch (e) {
            console.log('Toast error: ', e.toString());
        }
    }

    openOptionsPage(optionsPageName: string) {

        let options: OptionsPageSettings;

        options = this.getOptions(optionsPageName);

        this.selectedOption$ = this.optionsService.setOptionSettings(options);
        this.selectedOption$.subscribe((newValue) => {

            switch (optionsPageName) {

                case 'coordinatestyle':
                    this.settings.coordinateStyle = <CoordinateStyle>newValue;
                    break;

                case 'speedunits':
                    this.settings.speedUnits = <SpeedUnit>newValue;
                    break;
            }

            this.save();
        });

        this.routerExtensions.navigate(['/settingsoptions'], {
            transition: {
                name: "slide",
                duration: 150,
                curve: "linear"
            }
        });
    }

    private getOptions(optionsPageName: string): OptionsPageSettings {

        let options: OptionsPageSettings;

        switch (optionsPageName) {

            case 'coordinatestyle':
                options = {
                    title: 'Coordinate Style',
                    values: [
                        { key: 'degrees', value: 'ddd.ddddd' + '\u00B0' },
                        { key: 'minutes', value: 'ddd\u00B0 mm.mmm\'' },
                        { key: 'seconds', value: 'ddd\u00B0 mm\' ss.s"' }
                    ],
                    currentValue: this.settings.coordinateStyle
                };
                break;

            case 'speedunits':
                options = {
                    title: 'Speed units',
                    values: [
                        { key: 'kt', value: SpeedUnitsDisplayStyle.kt },
                        { key: 'kmh', value: SpeedUnitsDisplayStyle.kmh },
                        { key: 'ms', value: SpeedUnitsDisplayStyle.ms }
                    ],
                    currentValue: this.settings.speedUnits
                };
                break;
        }

        return options;

    }
}