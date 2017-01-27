import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';
import { Observable } from 'rxjs';
import { SpeedActions } from './../../store/speed.reducer';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'speed',
    templateUrl: 'speed.component.html',
    styleUrls: ['../geo.css', 'speed.component.css'],
    inputs: ['units']
})
export class SpeedComponent implements OnInit {

    private speed: number = 0.0;
    public speedReading: string = '';

    public units: string = "kt";
    public unitsReading: string;

    private unitFactor: number;
    public speedClasses: string;    // css classes for the speed field

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

    ngOnInit() {

        let speedObservable = <Observable<number>>this.store.select('speed');

        speedObservable
            .subscribe(v => {

                let unitFactor: number;
                if (this.units == 'kmh') {
                    unitFactor = 3.6;
                    this.unitsReading = 'km/h';
                }
                else if (this.units = 'kt') {
                    unitFactor = (3600 / 1852);
                    this.unitsReading = 'kt';
                }
                else {
                    this.units = 'ms';
                    this.unitsReading = 'm/s';
                    unitFactor = 1;
                }
                this.speed = v * unitFactor;
                this.speedReading = this.speed.toFixed(1).toString();
                this.ref.detectChanges();
            });

        this.speedClasses = 'text ' + this.units;

    }
}

