import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CampaignService, Campaign } from '../../services/campaign.service';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, RouterModule],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  selectedCampaign: Campaign | null = null;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.campaigns = this.campaignService.getCampaigns();
  }

  changeScore(id: number, value: number) {
    this.campaignService.changeScore(id, value);
    this.loadCampaigns(); //updates the list
  }

  deleteCampaign(id: number) {
    this.campaignService.deleteCampaign(id);
    this.loadCampaigns(); //updates the list
  }

  openUpdateModal(campaign: Campaign) {
    this.selectedCampaign = { ...campaign }; //creates a copy of the campaign object
  }

  updateCampaign() {
    if (!this.selectedCampaign) return;
    
    this.campaignService.updateCampaign(this.selectedCampaign);
    this.loadCampaigns(); //updates the list
    this.selectedCampaign = null;
  }
}
