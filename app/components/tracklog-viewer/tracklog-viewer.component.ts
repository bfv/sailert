import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrackPoint } from './../../shared/trackpoint';

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    inputs: ['tracklog'],
    moduleId: module.id,
    selector: 'tracklog-viewer',
    styleUrls: ['tracklog-viewer.component.css'],
    templateUrl: 'tracklog-viewer.component.html',
})
export class TracklogViewerComponent implements OnInit {

    public tracklog: TrackPoint[];

    constructor() {
        // empty
    }

    public ngOnInit() {
        // empty
    }

}
