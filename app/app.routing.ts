import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomepageComponent } from './pages/home/homepage.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = NativeScriptRouterModule.forRoot(routes);
