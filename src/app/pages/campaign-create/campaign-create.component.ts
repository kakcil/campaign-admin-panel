import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss'
})
export class CampaignCreateComponent {
  title: string = '';
  description: string = '';
  successMessage: string = '';

  createCampaign() {
    const newCampaign = {
      id: Date.now(),
      title: this.title,
      description: this.description,
      score: 0,
      date: new Date().toISOString().split('T')[0]
    };

    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    campaigns.push(newCampaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));

    this.successMessage = 'Campaign successfully added.';

    setTimeout(() => {
      this.successMessage = '';
    }, 2000);

    this.title = '';
    this.description = '';
  }
}
