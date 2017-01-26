import { Component, OnInit } from '@angular/core';
import { LocationService } from './../../services/location.service';


@Component({
    moduleId: module.id,
    selector: 'homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.css']
})
export class HomepageComponent implements OnInit {

    public running: boolean = false;


    constructor(private locationService: LocationService) {

    }

    ngOnInit() {
        // placeholder for now
    }

    start(): void {
        this.locationService.startLocationReadings();
        this.running = true;
    }

    stop() {
        this.locationService.stopLocationReadings();
        this.running = false;
    }
}