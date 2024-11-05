import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Pond {
  id: number;
  name: string;
  location: string;
  size: string;
}

interface Sensor {
  type: string;
  value: string;
}

@Component({
  selector: 'app-pond-list',
  templateUrl: './pond-list.component.html',
  styleUrls: ['./pond-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PondManagementComponent {
  ponds: Pond[] = [
    { id: 1, name: 'Pond A', location: 'Location A', size: '1000 sqft' },
    { id: 2, name: 'Pond B', location: 'Location B', size: '1500 sqft' }
  ];
  
  sensors: Sensor[] = [
    { type: 'Temperature', value: '24°C' },
    { type: 'pH', value: '7.0' },
    { type: 'Humidity', value: '70%' }
  ];

  selectedPondId: number | null = null;
  showAddPondForm: boolean = false;
  showUpdateForm: boolean = false;
  newPond: Pond = { id: 0, name: '', location: '', size: '' };
  pondToUpdate: Pond | null = null;
  toggleOptions: { [key: number]: boolean } = {};
  showMenuModal: boolean = false;
  selectedPond: Pond | null = null;

  toggleAddPondForm() {
    this.showAddPondForm = !this.showAddPondForm;
    if (!this.showAddPondForm) {
      this.newPond = { id: 0, name: '', location: '', size: '' };
    }
  }

  addPond() {
    if (this.newPond.name && this.newPond.location && this.newPond.size) {
      const newId = this.ponds.length ? Math.max(...this.ponds.map(p => p.id)) + 1 : 1;
      this.ponds.push({ ...this.newPond, id: newId });
      this.newPond = { id: 0, name: '', location: '', size: '' };
      this.showAddPondForm = false;
    }
  }

  deletePond(id: number) {
    if (confirm('Are you sure you want to delete this pond?')) {
      this.ponds = this.ponds.filter(pond => pond.id !== id);
      delete this.toggleOptions[id];
      this.showMenuModal = false;
    }
  }

  editPond(pond: Pond) {
    this.pondToUpdate = { ...pond };
    this.showUpdateForm = true;
    this.showMenuModal = false;
  }

  updatePond() {
    if (this.pondToUpdate) {
      const index = this.ponds.findIndex(p => p.id === this.pondToUpdate!.id);
      if (index > -1) {
        this.ponds[index] = this.pondToUpdate;
      }
      this.showUpdateForm = false;
      this.pondToUpdate = null;
    }
  }

  viewSensors(id: number) {
    this.selectedPondId = this.selectedPondId === id ? null : id;
    this.showMenuModal = false;
  }

  toggleOptionsVisibility(pond: Pond) {
    this.selectedPond = pond;
    this.showMenuModal = true;
  }

  closeMenuModal() {
    this.showMenuModal = false;
  }
}