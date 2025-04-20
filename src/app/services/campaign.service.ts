import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  score: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  //listens to the campaign count change
  private campaignCountChange = new Subject<number>();
  campaignCountChange$ = this.campaignCountChange.asObservable();

  constructor() { }

  getCampaigns(): Campaign[] {
    const data = localStorage.getItem('campaigns');
    return data ? JSON.parse(data) : [];
  }

  getCampaignCount(): number {
    return this.getCampaigns().length;
  }

  saveCampaign(campaign: Campaign): void {
    const campaigns = this.getCampaigns();
    campaigns.push(campaign);
    this.saveCampaigns(campaigns);
  }

  updateCampaign(campaign: Campaign): void {
    //score cannot be negative, if it is, it is set to 0
    if (campaign.score < 0) {
      campaign.score = 0;
    }
    
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(c => c.id === campaign.id);
    if (index !== -1) {
      campaigns[index] = campaign;
      this.saveCampaigns(campaigns);
    }
  }

  deleteCampaign(id: number): void {
    const campaigns = this.getCampaigns().filter(c => c.id !== id);
    this.saveCampaigns(campaigns);
  }

  changeScore(id: number, value: number): void {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(c => c.id === id);
    
    if (index !== -1) {
      //new score calculation
      const newScore = campaigns[index].score + value;
      
      //if new score is negative, it is set to 0
      campaigns[index].score = Math.max(0, newScore);
      
      this.saveCampaigns(campaigns);
    }
  }

  private saveCampaigns(campaigns: Campaign[]): void {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    this.notifyCampaignCountChange();
  }

  notifyCampaignCountChange(): void {
    const count = this.getCampaignCount();
    this.campaignCountChange.next(count);
  }
} 