import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';
import { Observable, Subscription } from 'rxjs';
import { SpeedActions } from './../../store/speed.reducer';
import { AppSettings } from './../../shared/appsettings';
import { SettingsService } from './../../services/settings.service';
import { SpeedUnit } from './../../shared/types';
@Component({
    moduleId: module.id,
    selector: 'speed',
    templateUrl: 'speed.component.html',
    styleUrls: ['../geo.css', 'speed.component.css'],
})
export class SpeedComponent implements OnInit, OnDestroy {

    private speed: number = 0.0;
    public speedReading: string = '';

    public units: string;
    public unitsReading: string;

    private unitFactor: number;
    public speedClasses: string;    // css classes for the speed field

    private speed$Sub: Subscription;
    private settings$Sub: Subscription;

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef, private settings: SettingsService) { }

    ngOnInit() {

        // get the unit setting out of the store
        let settings$ = <Observable<AppSettings>>this.store.select('settings');
        this.settings$Sub = settings$
            .map(v => v.speedUnits)
            .subscribe(speedUnits => {
                this.units = speedUnits;
                switch (speedUnits) {

                    case 'kmh':
                        this.unitFactor = 3.6;
                        this.unitsReading = 'km/h';
                        break;

                    case 'kt':
                        this.unitFactor = (3600 / 1852);
                        this.unitsReading = 'kt';
                        break;

                    case 'ms':
                        this.unitsReading = 'm/s';
                        this.unitFactor = 1;
                        break;
                }
                this.calculateSpeed();
            });

        let speed$ = <Observable<number>>this.store.select('speed');

        this.speed$Sub = speed$
            .subscribe(v => {
                this.speed = v;
                this.calculateSpeed();
            });
    }

    ngOnDestroy() {
        this.settings$Sub.unsubscribe();
        this.speed$Sub.unsubscribe();
    }

    private calculateSpeed() {
        this.speedReading = (this.speed * this.unitFactor).toFixed(1).toString();
        this.speedClasses = 'text ' + this.units;
        this.ref.detectChanges();
    }

    onTap() {
        let units = ['kt', 'kmh', 'ms'];
        let index = units.indexOf(this.units);
        this.settings.setSpeedUnits(<SpeedUnit>units[++index % 3]);
        this.calculateSpeed();
    }
}

