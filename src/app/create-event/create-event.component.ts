import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  eventForm: FormGroup;
  departments = ['AIDS', 'AIML', 'Bio Technology', 'Chemical', 'CET', 'CSE', 'CSM', 'ECE', 'EEE', 'IT', 'Mechanical', 'Civil'];
  batches = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i-1); // Generate batches dynamically
  selectedDepartments: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      entryTime: ['', Validators.required],
      batch: ['', Validators.required]
    });
  }

  // ✅ Function to handle checkbox selection
  toggleDepartment(dept: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedDepartments.push(dept);
    } else {
      this.selectedDepartments = this.selectedDepartments.filter(d => d !== dept);
    }
  }

  submitEvent() {
    if (this.eventForm.valid && this.selectedDepartments.length > 0) {
      const formData = this.eventForm.value;

      const payload = {
        name: formData.name,
        date: new Date(formData.date),
        startTime: new Date(`1970-01-01T${formData.startTime}:00`),
        entryTime: formData.entryTime,
        eligibleGroups: this.selectedDepartments.map(dep => ({
          department: dep,
          yearOfPassing: formData.batch
        }))
      };

      this.http.post('https://attendance-marker.up.railway.app/api/events', payload, { withCredentials: true })
        .subscribe({
          next: () =>{ alert('Event created successfully!');
            this.router.navigate(['/admin-dashboard']);
          },
          error: (error) => alert('Error creating event: ' + error.message)
        });
    } else {
      alert("Please select at least one department.");
    }
  }
}
