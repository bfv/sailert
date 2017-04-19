import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from './../../store/appstate';
import { CourseActions } from './../../store/course.reducer';

@Component({
    moduleId: module.id,
    selector: 'course',
    styleUrls: ['../geo.css', 'course.component.css'],
    templateUrl: 'course.component.html',
})
export class CourseComponent implements OnInit, OnDestroy {

    private course: number = 180;
    private courseReading: string;
    private courseObservable$: Observable<{}>;
    private courseObservable$Sub: Subscription;

    constructor(private store: Store<AppState>, private ref: ChangeDetectorRef) { }

    public ngOnInit() {

        this.courseObservable$ = this.store.select('course');

        this.courseObservable$Sub = this.courseObservable$
            .subscribe(v => {
                this.course = <number> v;
                this.courseReading = this.course.toFixed(0) + '\u00B0';
                this.ref.detectChanges();
            });
    }

    public ngOnDestroy() {
        this.courseObservable$Sub.unsubscribe();
    }
}
