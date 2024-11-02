// File: src/app/components/pond-list/pond-list.component.ts

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
  selectedPondId: string = '';
  newPond: Pond = { id: '', name: '', location: '', size: '', sensors: [] };
  newSensor: Sensor = { type: '', value: '' };
  showAddPondForm: boolean = false;
  showUpdateForm: boolean = false;
  pondToUpdate: Pond | null = null;

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

  toggleAddPondForm(): void {
    this.showAddPondForm = !this.showAddPondForm;
    this.newPond = { id: '', name: '', location: '', size: '', sensors: [] };
    this.newSensor = { type: '', value: '' };
  }

  addSensor(): void {
    if (this.newSensor.type && this.newSensor.value) {
      this.newPond.sensors!.push({ ...this.newSensor });
      this.newSensor = { type: '', value: '' };
    }
  }

  addPond(): void {
    if (this.newPond.id && this.newPond.name) {
      const defaultSensors: Sensor[] = [
        { type: 'pH Sensor', value: '7.0' },
        { type: 'Temperature Sensor', value: '25°C' },
        { type: 'Water Level Sensor', value: 'Normal' },
        { type: 'Rain Sensor', value: 'No Rain' },
        { type: 'Oxygen Sensor', value: '8 mg/L' }
      ];

      this.newPond.sensors = this.newPond.sensors || [];
      this.newPond.sensors = [...this.newPond.sensors, ...defaultSensors];
      this.pondService.addPond(this.newPond).subscribe((pond) => {
        this.ponds.push(pond);
        this.toggleAddPondForm();
      });
    } else {
      alert("Please enter both Pond ID and Pond Name.");
    }
  }

  deletePond(pondId: string): void {
    if (confirm('Are you sure you want to delete this pond?')) {
      this.pondService.deletePond(pondId).subscribe(() => {
        this.ponds = this.ponds.filter(pond => pond.id !== pondId);
      });
    }
  }

  editPond(pond: Pond): void {
    this.pondToUpdate = { ...pond };
    this.showUpdateForm = true;
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
