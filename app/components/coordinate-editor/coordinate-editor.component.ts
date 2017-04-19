import { Component, OnInit } from '@angular/core';

@Component({
    inputs: ['hemispereType'],
    moduleId: module.id,
    selector: 'coordinate-editor',
    styleUrls: ['coordinate-editor.component.css'],
    templateUrl: 'coordinate-editor.component.html',
})
export class CoordinateEditorComponent implements OnInit {

    public hemisphere: string = 'N';
    public degrees: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;

    public degreesFormatted: string;
    public minutesFormatted: string;
    public secondsFormatted: string;

    constructor() {
        // empty
    }

    public ngOnInit() {
        this.formatCoordinate();
    }

    public formatCoordinate(): void {
        this.degreesFormatted = this.degrees.toFixed(0) + '\u00B0';
        this.minutesFormatted = this.minutes.toFixed(0) + '\'';
        this.secondsFormatted = this.seconds.toFixed(1) + '"';
    }
}
