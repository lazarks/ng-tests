import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { TwainService } from './services/twain.service';
import { UserService } from './services/user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardheroComponent } from './components/dashboard/dashboardhero.component';
import { Router, RouterModule } from '@angular/router';
import { HeroService } from './services/hero.service';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    WelcomeComponent,
    AboutComponent,
    DashboardComponent,
    DashboardheroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [TwainService, UserService, HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
