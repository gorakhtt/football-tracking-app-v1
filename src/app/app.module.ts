import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FootballUpdatesHomeComponent } from './@components/football-updates-home/football-updates-home.component';
// import { TeamResultsComponent } from './@components/team-results/team-results.component';
import { FootballUpdatesInfoService } from './@services/football-updates-info.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    FootballUpdatesHomeComponent,
    // TeamResultsComponent,
  ],
  providers: [FootballUpdatesInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
