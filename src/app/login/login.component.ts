import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports:[RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  rollNumber: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const user = { rollNumber: this.rollNumber, password: this.password };

    this.http.post('https://attendance-marker.up.railway.app/api/login', user, { withCredentials: true })
      .subscribe({
        next: () => {alert('User signed up successfully'); this.router.navigate(['/main'])},
        error: (err) => {this.errorMessage = err.error
          console.log(this.errorMessage);
        }
      });
  }
}
