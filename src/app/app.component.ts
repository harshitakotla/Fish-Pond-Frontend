import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PondManagementComponent } from './pond-list/pond-list.component';  // Update path if necessary

@Component({
  selector: 'app-root',  // This must match <app-root> in index.html
  standalone: true,
  imports: [RouterOutlet, PondManagementComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AdminModule';
}
