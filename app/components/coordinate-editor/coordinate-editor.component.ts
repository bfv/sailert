import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'coordinate-editor',
    templateUrl: 'coordinate-editor.component.html',
    styleUrls: ['coordinate-editor.component.css'],
    inputs: ['hemispereType']
})
export class CoordinateEditorComponent implements OnInit {

    hemisphere: string = 'N';
    degrees: number = 0;
    minutes: number = 0;
    seconds: number = 0;

    degreesFormatted: string;
    minutesFormatted: string;
    secondsFormatted: string;

    constructor() { }

    ngOnInit() {
        this.formatCoordinate();
    }

    formatCoordinate(): void {
        this.degreesFormatted = this.degrees.toFixed(0) + '\u00B0';;
        this.minutesFormatted = this.minutes.toFixed(0) + '\'';
        this.secondsFormatted = this.seconds.toFixed(1) + '"';
    }
}