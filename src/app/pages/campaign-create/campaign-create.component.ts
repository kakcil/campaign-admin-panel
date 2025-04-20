import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss'
})
export class CampaignCreateComponent {
  title: string = '';
  description: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private campaignService: CampaignService
  ) {}

  createCampaign() {
    const newCampaign = {
      id: Date.now(),
      title: this.title,
      description: this.description,
      score: 0,
      date: new Date().toISOString().split('T')[0]
    };

    this.campaignService.saveCampaign(newCampaign);
    
    this.successMessage = 'Campaign successfully added.';

    setTimeout(() => {
      this.successMessage = '';
      this.router.navigate(['/dashboard/campaigns']);
    }, 2000);

    this.title = '';
    this.description = '';
  }
}
