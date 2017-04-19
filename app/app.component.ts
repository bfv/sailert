import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
    selector: 'my-app',
    styleUrls: ['app.component.css'],
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

    private version: number = 2;

    constructor(private settingsService: SettingsService) {
        // initialize the SettingsService a.s.a.p.
    }

    public ngOnInit() {
        // empty
    }

}
