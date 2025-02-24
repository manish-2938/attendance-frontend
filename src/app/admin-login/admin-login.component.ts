import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'admin-login',
  standalone: true,
  imports:[RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const user = { username: this.username, password: this.password };

    this.http.post('https://attendancemarker.in/api/admin-login', user, { withCredentials: true })
      .subscribe({
        next: () => this.router.navigate(['/admin-dashboard']),
        error: (err) => this.errorMessage = err.error
      });
  }
}
