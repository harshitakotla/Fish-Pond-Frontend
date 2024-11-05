import { Component, OnInit } from '@angular/core';
import { PondService } from '../services/pond.service';
import { Pond, Sensor } from '../models/pond.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pond-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pond-list.component.html',
  styleUrls: ['./pond-list.component.css'],
})
export class PondListComponent implements OnInit {
  ponds: Pond[] = [];
  sensors: Sensor[] = [];
  selectedPondId: string | null = null;
  newPond: Pond = { id: '', name: '', location: '', size: '', sensors: [] };
  showAddPondForm: boolean = false;
  showUpdateForm: boolean = false;
  pondToUpdate: Pond | null = null;
  showOptionsModal: boolean = false;
  selectedPond: Pond | null = null;

  constructor(private pondService: PondService) {}

  ngOnInit(): void {
    this.loadPonds();
  }

  loadPonds(): void {
    this.pondService.getAllPonds().subscribe((data) => {
      this.ponds = data;
    });
  }

  viewSensors(pondId: string): void {
    this.selectedPondId = pondId;
    this.pondService.getSensorsByPond(pondId).subscribe((data) => {
      this.sensors = data;
    });
  }

  toggleOptionsModal(pond?: Pond): void {
    this.selectedPond = pond || null;
    this.showOptionsModal = !this.showOptionsModal;
  }

  toggleAddPondForm(): void {
    this.showAddPondForm = !this.showAddPondForm;
  }

  addPond(): void {
    if (this.newPond.id && this.newPond.name) {
      this.pondService.addPond(this.newPond).subscribe((pond) => {
        this.ponds.push(pond);
        this.toggleAddPondForm();
      });
    } else {
      alert("Please enter both Pond ID and Pond Name.");
    }
  }

  deletePond(pondId: string | undefined): void {
    if (pondId && confirm('Are you sure you want to delete this pond?')) {
      this.pondService.deletePond(pondId).subscribe(() => {
        this.ponds = this.ponds.filter(pond => pond.id !== pondId);
        this.showOptionsModal = false;
      });
    }
  }

  editPond(pond: Pond): void {
    this.pondToUpdate = { ...pond };
    this.showUpdateForm = true;
    this.showOptionsModal = false;
  }

  updatePond(): void {
    if (this.pondToUpdate) {
      this.pondService.updatePond(this.pondToUpdate).subscribe((updatedPond) => {
        const index = this.ponds.findIndex(p => p.id === updatedPond.id);
        if (index !== -1) this.ponds[index] = updatedPond;
        this.showUpdateForm = false;
        this.pondToUpdate = null;
      });
    }
  }
}
