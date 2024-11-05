import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Pond {
  id: string;
  name: string;
  location: string;
  size: string;
  image?: File;
  sensors?: Sensor[];
}

interface Sensor {
  type: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class PondService {
  private baseUrl = 'http://localhost:8080/admin/ponds';

  constructor(private http: HttpClient) {}

  // Get all ponds
  getPonds(): Observable<Pond[]> {
    return this.http.get<Pond[]>(this.baseUrl);
  }

  // Add a new pond
  addPond(pond: Pond): Observable<Pond> {
    const formData = new FormData();
    formData.append('name', pond.name);
    formData.append('location', pond.location);
    formData.append('size', pond.size);
    if (pond.image) {
      formData.append('image', pond.image);
    }

    return this.http.post<Pond>(this.baseUrl, formData);
  }

  // Get pond by ID
  getPondById(id: string): Observable<Pond> {
    return this.http.get<Pond>(`${this.baseUrl}/${id}`);
  }

  // Update an existing pond
  updatePond(id: string, pond: Pond): Observable<Pond> {
    return this.http.put<Pond>(`${this.baseUrl}/${id}`, pond);
  }

  // Delete a pond
  deletePond(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

  // Get sensors by pond ID
  getSensorsByPond(id: string): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.baseUrl}/${id}/sensors`);
  }

  // Add a sensor to a pond
  addSensorToPond(pondId: string, sensor: Sensor): Observable<Pond> {
    return this.http.post<Pond>(`${this.baseUrl}/${pondId}/sensors`, sensor);
  }
}
