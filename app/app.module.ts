import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/platform";

// routing 
import { NativeScriptRouterModule, } from "nativescript-angular/router";
import { appRoutingProviders, routing } from './app.routing';

// UI
import { SIDEDRAWER_DIRECTIVES, } from "nativescript-telerik-ui/sidedrawer/angular";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// store
import { StoreModule } from '@ngrx/store';
import { speedReducer } from './store/speed.reducer';
import { courseReducer } from './store/course.reducer';
import { positionReducer } from './store/position.reducer';
import { tracklogReducer } from './store/tracklog.reducer';
import { settingsReducer } from './store/settings.reducer';

import { AppComponent } from "./app.component";

// components
import { BottomNavbarModule } from './modules/bottomnavbar/bottomnavbar.module';
import { ComponentsModule } from './components/components.module';

// application
import { MainpageComponent } from './pages/main/mainpage.component';
import { HomepageComponent } from './pages/home/homepage.component';
import { MappageComponent } from './pages/map/mappage.component';
import { WaypointpageComponent } from './pages/waypoints/waypointspage.components';
import { SettingspageComponent } from './pages/settings/settingspage.component';
import { LatitudeDegrees, LongitudeDegreesPipe } from './pipes/degrees.pipe';
import { SpeedComponent } from './components/speed/speed.component';
import { CourseComponent } from './components/course/course.component';
import { PositionComponent } from './components/position/position.component';
import { LocationService } from './services/location.service';
import { TracklogViewerComponent } from './components/tracklog-viewer/tracklog-viewer.component';
import { SettingsService } from './services/settings.service';

@NgModule({
    declarations: [
        SIDEDRAWER_DIRECTIVES,
        AppComponent,
        MainpageComponent,
        MappageComponent,
        WaypointpageComponent,
        HomepageComponent,
        SettingspageComponent,
        LatitudeDegrees,
        LongitudeDegreesPipe,
        SpeedComponent,
        CourseComponent,
        PositionComponent,
        TracklogViewerComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        routing,
        TNSFontIconModule.forRoot({
            'fa': 'font-awesome.css'
        }),
        StoreModule.provideStore({
            speed: speedReducer,
            course: courseReducer,
            position: positionReducer,
            tracklog: tracklogReducer,
            settings: settingsReducer,
        }),
        BottomNavbarModule,
        ComponentsModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    exports: [
        NativeScriptModule,
        NativeScriptRouterModule,
    ],
    providers: [
        appRoutingProviders,
        LocationService,
        SettingsService
    ]
})
export class AppModule { }
