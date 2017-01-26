import { Component, OnInit } from '@angular/core';
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
})
export class SpeedComponent implements OnInit {

    public speed: number = 5.3;
    public speedReading: string;
    public units: string = "kt";
    private speedObservable: Observable<{}>;

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

    ngOnInit() {

        this.speedObservable = this.store.select('speed');

        this.speedObservable
            .subscribe(v => {
                this.speed = <number>v * (3600 / 1852);
                this.speedReading = this.speed.toFixed(1).toString() + ' kt';
                this.ref.detectChanges();
            });
    }
}