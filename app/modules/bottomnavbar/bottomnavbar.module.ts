import { NgModule } from "@angular/core";
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { BottomNavitemComponent } from './components/bottom-navitem/bottom-navitem.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
    imports: [
        TNSFontIconModule.forRoot({
            'fa': 'font-awesome.css'
        }),

    ],
    declarations: [
        BottomNavbarComponent,
        BottomNavitemComponent
    ],
    exports: [
        BottomNavbarComponent,
        BottomNavitemComponent
    ],
    providers: [

    ]
})
export class BottomNavbarModule { }