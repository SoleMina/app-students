import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { StudentsService } from './core/services/students.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    MatSidenavModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    provideAnimationsAsync(),
    StudentsService,
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
