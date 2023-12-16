import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Standings,
  TeamStandingsInfo,
  TeamStnding,
} from '../../@model/standings';
import { COUNTRIES, LEAGUE_LIST } from '../../@constants/countries-constant';
import { Country, TeamLeague, TeamLeagueInfo } from '../../@model/team-league';
import { FootballUpdatesInfoService } from '../../@services/football-updates-info.service';

@Component({
  selector: 'app-football-updates-home',
  templateUrl: './football-updates-home.component.html',
  styleUrls: ['./football-updates-home.component.css'],
})
export class FootballUpdatesHomeComponent implements OnInit, OnDestroy {
  countriesList: Country[] = [];
  teamLeaguesList: TeamLeague[] = [];
  teamStandingInfo: TeamStnding[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private readonly footballUpdatesInfoService: FootballUpdatesInfoService
  ) {}

  ngOnInit(): void {
    this.getTeamLeagues();
  }

  getTeamLeagues(): void {
    this.subscription.add(
      this.footballUpdatesInfoService
        .getTeamLeagues()
        .subscribe((res: TeamLeagueInfo) => {
          this.teamLeaguesList = res.response.filter(
            (leagueInfo: TeamLeague) =>
              COUNTRIES.indexOf(leagueInfo.country.name) >= 1 &&
              LEAGUE_LIST.indexOf(leagueInfo.league.name) >= 1
          );
          this.getStandingsForSelectedCountry(this.teamLeaguesList[0]);
        })
    );
  }

  getStandingsForSelectedCountry(leagueInfo: TeamLeague): void {
    this.subscription.add(
      this.footballUpdatesInfoService
        .getStandingsForSelectedCountry(leagueInfo)
        .subscribe((res: TeamStandingsInfo) => {
          this.teamStandingInfo = res.response;
          console.log(this.teamStandingInfo);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
