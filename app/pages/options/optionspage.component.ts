import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OptionsPageSettings } from './opionspagesettings';
import { OptionsettingsService } from './optionsetting.service';

@Component({
    moduleId: module.id,
    selector: 'optionspage',
    styleUrls: ['optionspage.component.css'],
    templateUrl: 'optionspage.component.html',
})
export class OptionspageComponent implements OnInit {

    public optionPageSettings: OptionsPageSettings;
    public items: Array<{ key: string, value: string }>;

    constructor(private optionsService: OptionsettingsService, private location: Location) { }

    public ngOnInit() {
        this.optionPageSettings = this.optionsService.optionPageSettings;
        this.items = this.optionPageSettings.values;
    }

    public onNavBtnTap() {
        this.location.back();
    }

    public setValue(newValue: string) {
        this.optionsService.setValue(newValue);
        this.onNavBtnTap();
    }
}
