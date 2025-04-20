import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CampaignService } from '../../services/campaign.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  campaignCount: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private campaignService: CampaignService,
    private router: Router
  ) {
    this.updateCampaignCount();
  }

  ngOnInit() {
    //listens the route changes and updates the campaign count
    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateCampaignCount();
      })
    );

    //listens the campaign count changes
    this.subscription.add(
      this.campaignService.campaignCountChange$.subscribe(count => {
        this.campaignCount = count;
      })
    );
  }

  ngOnDestroy() {
    //prevents memory leaks
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  updateCampaignCount() {
    this.campaignCount = this.campaignService.getCampaignCount();
  }
}
