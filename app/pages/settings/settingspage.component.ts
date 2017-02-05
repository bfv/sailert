import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'settingspage',
    templateUrl: 'settingspage.component.html',
    styleUrls: ['settingspage.component.css']
})
export class SettingspageComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        console.log('settings init');
    }
}