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


@Component({
    moduleId: module.id,
    selector: 'settingspage',
    templateUrl: 'settingspage.component.html',
    styleUrls: ['settingspage.component.css']
})
export class SettingspageComponent implements OnInit {

    public settings: AppSettings;
    public selectedIndex: number;
    public items = [];
    public pickerVisible: boolean = false;
    public speedUnits: string;

    private itemValues = [];
    private settings$Sub: Subscription;
    private useSelectedIndex: boolean;
    private selectedOption$: Observable<string>;

    constructor(private store: Store<AppState>, private settingsService: SettingsService, private routerExtensions: RouterExtensions, private optionsService: OptionsettingsService) { }

    ngOnInit() {

        this.items = ['m/s', 'km/h', 'knots'];
        this.itemValues = ['ms', 'kmh', 'kt'];

        let settings$ = <Observable<AppSettings>>this.store.select('settings');
        this.settings$Sub = settings$.subscribe(storeSettings => {
            this.settings = Object.assign({}, storeSettings);
            this.setValues(this.itemValues.indexOf(this.settings.speedUnits));
        });
    }

    selectedIndexChanged(picker) {
        if (this.useSelectedIndex) {
            this.setValues(picker.selectedIndex);
        }
        this.useSelectedIndex = true;
    }

    private setValues(index: number) {
        this.selectedIndex = index;
        this.settings.speedUnits = this.itemValues[index];
        this.speedUnits = this.items[index];
    }

    toggleList() {
        this.pickerVisible = !this.pickerVisible;
        this.useSelectedIndex = false;
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
        //console.log('launch optionspage: ', optionsPageName);

        let options: OptionsPageSettings;

        options = {
            title: 'Coordinate Style',
            values: [
                { key: 'deg', value: 'ddd.ddddd' + '\u00B0' },
                { key: 'min', value: 'ddd\u00B0 mm.mmm\'' },
                { key: 'sec', value: 'ddd\u00B0 mm\' ss.s"' }
            ],
            currentValue: 'min'
        }

        this.selectedOption$ = this.optionsService.setOptionSettings(options);
        this.selectedOption$.subscribe((newValue) => {
            console.log('newValue', newValue);
        });

        this.routerExtensions.navigate(['/settingsoptions'], {
            transition: {
                name: "slide",
                duration: 150,
                curve: "linear"
            }
        });
    }
}