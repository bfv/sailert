import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { MainpageComponent } from './pages/main/mainpage.component';
import { HomepageComponent } from './pages/home/homepage.component';
import { MappageComponent } from './pages/map/mappage.component';
import { WaypointpageComponent } from './pages/waypoints/waypointspage.components';
import { SettingspageComponent } from './pages/settings/settingspage.component';

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
        ]
    },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = NativeScriptRouterModule.forRoot(routes);
