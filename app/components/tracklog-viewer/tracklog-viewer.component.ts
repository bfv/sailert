import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TrackPoint } from './../../shared/trackpoint';

@Component({
    inputs: ['tracklog'],
    moduleId: module.id,
    selector: 'tracklog-viewer',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: 'tracklog-viewer.component.html',
    styleUrls: ['tracklog-viewer.component.css']
})
export class TracklogViewerComponent implements OnInit {

    public tracklog: TrackPoint[];

    constructor() { }

    ngOnInit() {

    }

}