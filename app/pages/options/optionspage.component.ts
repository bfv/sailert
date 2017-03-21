import { Component, OnInit } from '@angular/core';
import { OptionsPageSettings } from './opionspagesettings';
import { OptionsettingsService } from './optionsetting.service';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'optionspage',
    templateUrl: 'optionspage.component.html'
})
export class OptionspageComponent implements OnInit {

    optionPageSettings: OptionsPageSettings;
    items: { key: string, value: string }[];

    constructor(private optionsService: OptionsettingsService, private location: Location) { }

    ngOnInit() {
        this.optionPageSettings = this.optionsService.optionPageSettings;
        this.items = this.optionPageSettings.values;
    }

    onNavBtnTap() {
        this.location.back();
    }
}