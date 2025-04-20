import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Campaign {
  id: number;
  title: string;
  description: string;
  score: number;
  date: string;
}

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  selectedCampaign: Campaign | null = null;

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns() {
    const data = localStorage.getItem('campaigns');
    this.campaigns = data ? JSON.parse(data) : [];
  }

  changeScore(id: number, value: number) {
    const index = this.campaigns.findIndex(c => c.id === id);
    if (index !== -1) {
      this.campaigns[index].score += value;
      this.saveToStorage();
    }
  }

  deleteCampaign(id: number) {
    this.campaigns = this.campaigns.filter(c => c.id !== id);
    this.saveToStorage();
  }

  openUpdateModal(campaign: Campaign) {
    this.selectedCampaign = { ...campaign }; //creates a copy
  }

  updateCampaign() {
    if (!this.selectedCampaign) return;
    
    const index = this.campaigns.findIndex(c => c.id === this.selectedCampaign!.id);
    if (index !== -1) {
      this.campaigns[index].title = this.selectedCampaign.title;
      this.campaigns[index].description = this.selectedCampaign.description;
      this.saveToStorage();
    }
    this.selectedCampaign = null;
  }

  saveToStorage() {
    localStorage.setItem('campaigns', JSON.stringify(this.campaigns));
  }
}
