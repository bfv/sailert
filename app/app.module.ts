import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

// routing 
import { NativeScriptRouterModule, } from "nativescript-angular/router";
import { appRoutingProviders, routing } from './app.routing';

// store
import { StoreModule } from '@ngrx/store';
import { speedReducer } from './store/speed.reducer';
import { courseReducer } from './store/course.reducer';
import { positionReducer } from './store/position.reducer';
import { tracklogReducer } from './store/tracklog.reducer';

import { AppComponent } from "./app.component";

// application
import { HomepageComponent } from './pages/home/homepage.component';
import { LatitudeDegrees, LongitudeDegreesPipe } from './pipes/degrees.pipe';
import { SpeedComponent } from './components/speed/speed.component';
import { CourseComponent } from './components/course/course.component';
import { PositionComponent } from './components/position/position.component';
import { LocationService } from './services/location.service';

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        LatitudeDegrees,
        LongitudeDegreesPipe,
        SpeedComponent,
        CourseComponent,
        PositionComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        routing,
        StoreModule.provideStore({
            speed: speedReducer,
            course: courseReducer,
            position: positionReducer,
            tracklog: tracklogReducer,
        }),
    ],
    schemas: [NO_ERRORS_SCHEMA],
    exports: [
        NativeScriptModule,
        NativeScriptRouterModule
    ],
    providers: [
        appRoutingProviders,
        LocationService
    ]
})
export class AppModule { }
