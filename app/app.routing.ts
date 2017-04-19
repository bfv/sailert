import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { HomepageComponent } from './pages/home/homepage.component';
import { MainpageComponent } from './pages/main/mainpage.component';
import { MappageComponent } from './pages/map/mappage.component';
import { OptionspageComponent } from './pages/options/optionspage.component';
import { SettingspageComponent } from './pages/settings/settingspage.component';
import { WaypointpageComponent } from './pages/waypoints/waypointspage.components';

/* tslint:disable:object-literal-sort-keys */
const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    {
        path: 'main',
        component: MainpageComponent,
        children: [
            { path: '', component: HomepageComponent },
            { path: 'map', component: MappageComponent },
            { path: 'waypoints', component: WaypointpageComponent },
            { path: 'settings', component: SettingspageComponent },
        ],
    },
    { path: 'settingsoptions', component: OptionspageComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = NativeScriptRouterModule.forRoot(routes);
