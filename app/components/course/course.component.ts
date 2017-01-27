import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../store/appstate';
import { Observable } from 'rxjs';
import { CourseActions } from './../../store/course.reducer';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'course',
    templateUrl: 'course.component.html',
    styleUrls: ['../geo.css', 'course.component.css'],
})
export class CourseComponent implements OnInit {

    private course: number = 180;
    private courseReading: string;
    private courseObservable: Observable<{}>;

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

    ngOnInit() {

        this.courseObservable = this.store.select('course');

        this.courseObservable
            .subscribe(v => {
                this.course = <number>v;
                this.courseReading = this.course.toFixed(0) + '\u00B0';
                this.ref.detectChanges();
            });
    }
}