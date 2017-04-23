import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { BottomNavitemComponent } from './components/bottom-navitem/bottom-navitem.component';

@NgModule({
    declarations: [
        BottomNavbarComponent,
        BottomNavitemComponent,
    ],
    exports: [
        BottomNavitemComponent,
        BottomNavbarComponent,
    ],
    imports: [
        TNSFontIconModule.forRoot({
            fa: 'font-awesome.css',
        }),
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class BottomNavbarModule { }
