import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

// routing
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { appRoutingProviders, routing } from './app.routing';

// UI
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// store
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './store/course.reducer';
import { positionReducer } from './store/position.reducer';
import { settingsReducer } from './store/settings.reducer';
import { speedReducer } from './store/speed.reducer';
import { tracklogReducer } from './store/tracklog.reducer';

import { AppComponent } from './app.component';

// components
import { ComponentsModule } from './components/components.module';
import { CourseComponent } from './components/course/course.component';
import { PositionComponent } from './components/position/position.component';
import { SpeedComponent } from './components/speed/speed.component';
import { TracklogViewerComponent } from './components/tracklog-viewer/tracklog-viewer.component';

import { BottomNavbarModule } from './modules/bottomnavbar/bottomnavbar.module';

// application
import { HomepageComponent } from './pages/home/homepage.component';
import { MainpageComponent } from './pages/main/mainpage.component';
import { MappageComponent } from './pages/map/mappage.component';
import { OptionspageComponent } from './pages/options/optionspage.component';
import { SettingspageComponent } from './pages/settings/settingspage.component';
import { WaypointpageComponent } from './pages/waypoints/waypointspage.components';
import { LatitudeDegrees, LongitudeDegreesPipe } from './pipes/degrees.pipe';
import { LocationService } from './services/location.service';
import { SettingsService } from './services/settings.service';

import { OptionsettingsService } from './pages/options/optionsetting.service';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        MainpageComponent,
        MappageComponent,
        WaypointpageComponent,
        HomepageComponent,
        SettingspageComponent,
        OptionspageComponent,
        LatitudeDegrees,
        LongitudeDegreesPipe,
        SpeedComponent,
        CourseComponent,
        PositionComponent,
        TracklogViewerComponent,
    ],
    exports: [
        NativeScriptModule,
        NativeScriptRouterModule,
    ],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        routing,
        TNSFontIconModule.forRoot({
            fa: 'font-awesome.css',
        }),
        StoreModule.provideStore({
            course: courseReducer,
            position: positionReducer,
            settings: settingsReducer,
            speed: speedReducer,
            tracklog: tracklogReducer,
        }),
        BottomNavbarModule,
        ComponentsModule,
    ],
    providers: [
        appRoutingProviders,
        LocationService,
        SettingsService,
        OptionsettingsService,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
