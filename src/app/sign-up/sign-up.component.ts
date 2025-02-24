import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports:[CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstName: string = '';
  lastName: string = '';
  rollNumber: string = '';
  department: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  YearOfPassing: string = '';
  departments = ['AIDS', 'AIML', 'Bio Technology', 'Chemical', 'CET', 'CSE', 'CSM', 'ECE', 'EEE', 'IT', 'Mechanical', 'Civil'];


  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      rollNumber: this.rollNumber,
      department: this.department,
      yearOfPassing: this.YearOfPassing,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.http.post('https://attendancemarker.in/api/signup', user)
      .subscribe({
        next: () => {alert('User signed up successfully');
           this.router.navigate(['/login']);
        },
        error: (err) => {this.errorMessage = err.error;
          console.log(this.errorMessage);
        }
        
      });
  }
}
