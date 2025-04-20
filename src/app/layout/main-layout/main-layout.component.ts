import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
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
  pageTitle: string = 'Campaign Management';
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
      ).subscribe((event: Event) => {
        this.updateCampaignCount();
        this.updatePageTitle((event as NavigationEnd).url);
      })
    );

    //listens the campaign count changes
    this.subscription.add(
      this.campaignService.campaignCountChange$.subscribe(count => {
        this.campaignCount = count;
      })
    );

    // İlk yüklemede sayfa başlığını ayarla
    this.updatePageTitle(this.router.url);
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

  updatePageTitle(url: string) {
    if (url.includes('/dashboard/campaigns')) {
      this.pageTitle = 'List Campaigns';
    } else if (url.includes('/dashboard/create')) {
      this.pageTitle = 'Create Campaign';
    } else {
      this.pageTitle = 'Campaign Management';
    }
  }
}
