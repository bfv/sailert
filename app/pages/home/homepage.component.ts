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
    public btnText: string = 'start';

    constructor(private locationService: LocationService) {

    }

    ngOnInit() {
        // placeholder for now
    }

    start(): void {
        if (!this.running) {
            this.locationService.startLocationReadings();
        }
        else {
            this.locationService.stopLocationReadings();
        }

        this.running = !this.running;
        this.btnText = this.running ? 'STOP' : 'START';
    }

}