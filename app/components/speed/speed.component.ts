import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SettingsService } from './../../services/settings.service';
import { AppSettings } from './../../shared/appsettings';
import { SpeedUnit } from './../../shared/types';
import { AppState } from './../../store/appstate';
import { SpeedActions } from './../../store/speed.reducer';

@Component({
    moduleId: module.id,
    selector: 'speed',
    styleUrls: ['../geo.css', 'speed.component.css'],
    templateUrl: 'speed.component.html',
})
export class SpeedComponent implements OnInit, OnDestroy {

    public speedReading: string = '';
    public units: string;
    public unitsReading: string;
    public speedClasses: string;    // css classes for the speed field

    private speed: number = 0.0;
    private unitFactor: number;
    private speed$Sub: Subscription;
    private settings$Sub: Subscription;

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef, private settings: SettingsService) { }

    public ngOnInit() {

        // get the unit setting out of the store
        const settings$ = <Observable<AppSettings>> this.store.select('settings');
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

        const speed$ = <Observable<number>> this.store.select('speed');

        this.speed$Sub = speed$
            .subscribe(v => {
                this.speed = v;
                this.calculateSpeed();
            });
    }

    public ngOnDestroy() {
        this.settings$Sub.unsubscribe();
        this.speed$Sub.unsubscribe();
    }

    public onTap() {
        const units = ['kt', 'kmh', 'ms'];
        let index = units.indexOf(this.units);
        this.settings.setSpeedUnits(<SpeedUnit> units[++index % 3]);
        this.calculateSpeed();
    }

    private calculateSpeed() {
        this.speedReading = (this.speed * this.unitFactor).toFixed(1).toString();
        this.speedClasses = 'text ' + this.units;
        this.ref.detectChanges();
    }

}
