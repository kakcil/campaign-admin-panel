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
  campaignToDelete: Campaign | null = null;

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

  openDeleteModal(campaign: Campaign) {
    this.campaignToDelete = campaign;
  }

  deleteCampaign() {
    if (this.campaignToDelete) {
      this.campaignService.deleteCampaign(this.campaignToDelete.id);
      this.loadCampaigns(); // updates the list
      this.campaignToDelete = null;
    }
  }

  cancelDelete() {
    this.campaignToDelete = null;
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
