import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  departments = ['AIDS', 'AIML', 'Bio Technology', 'Chemical', 'CET', 'CSE', 'CSM', 'ECE', 'EEE', 'IT', 'Mechanical', 'Civil'];
  batches = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  selectedDepartments: string[] = [];
  eventId!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      entryTime: ['', Validators.required],
      batch: ['', Validators.required] // ✅ Batch is required
    });
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';

    // Fetch event details
    this.http.get(`https://attendance-marker.up.railway.app/api/events/${this.eventId}`, { withCredentials: true }).subscribe({
      next: (event: any) => {
        this.eventForm.patchValue({
          name: event.name,
          date: event.date.split('T')[0], // Formatting the date
          startTime: this.formatTime(event.startTime), // Extracting time
          entryTime: event.entryTime,
          batch: event.eligibleGroups[0]?.yearOfPassing || ''
        });
        this.selectedDepartments = event.eligibleGroups.map((group: any) => group.department);
      },
      error: (error) => alert('Error fetching event details: ' + error.message)
    });
  }

  toggleDepartment(dept: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedDepartments.push(dept);
    } else {
      this.selectedDepartments = this.selectedDepartments.filter(d => d !== dept);
    }
  }
  formatTime(dateTime: string): string {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');  // Ensures two-digit hours
    const minutes = date.getMinutes().toString().padStart(2, '0');  // Ensures two-digit minutes
    return `${hours}:${minutes}`;  // Return in HH:MM format
  }

  updateEvent() {
    if (this.eventForm.valid && this.selectedDepartments.length > 0) {
      const formData = this.eventForm.value;

      const updatedEvent = {
        name: formData.name,
        date: new Date(formData.date),
        startTime: new Date(`1970-01-01T${formData.startTime}:00`),
        entryTime: formData.entryTime,
        eligibleGroups: this.selectedDepartments.map(dep => ({
          department: dep,
          yearOfPassing: formData.batch
        }))
      };

      this.http.put(`https://attendance-marker.up.railway.app/api/events/${this.eventId}`, updatedEvent)
        .subscribe({
          next: () => {
            alert('Event updated successfully!');
            this.router.navigate(['/admin-dashboard']); // Redirect to admin dashboard
          },
          error: (error) => {alert('Error updating event: ' + error.message)
            console.log(error);
          }
        });
    } else {
      alert("Please select at least one department.");
    }
  }
}
