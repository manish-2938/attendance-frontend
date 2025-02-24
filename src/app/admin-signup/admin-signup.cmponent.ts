import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-sign-up',
  standalone: true,
  imports:[CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './admin-signup.component.html',
})
export class AdminSignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.http.post('https://attendancemarker.in/api/admin-signup', user)
      .subscribe({
        next: () => {alert('User signed up successfully');
           this.router.navigate(['/admin-login']);
        },
        error: (err) => {this.errorMessage = err.error;
          console.log(this.errorMessage);
        }
      });
  }
}
