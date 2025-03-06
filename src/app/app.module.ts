import { NgModule, isDevMode } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    MatSidenavModule,
    HttpClientModule,
    AuthModule,
    StoreModule.forRoot(rootReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideAnimationsAsync(),
    StudentsService,
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
