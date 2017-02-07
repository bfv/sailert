import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

    private version: number = 2;

    constructor(private settingsService: SettingsService) {
        // initialize the SettingsService a.s.a.p.
    }

    ngOnInit() {

    }

}
