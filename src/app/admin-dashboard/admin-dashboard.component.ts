import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  events: any[] = [];
  pastEvents: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<any[]>('https://attendancemarker.in/api/events', { withCredentials: true }).subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  deleteEvent(eventId: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.http.delete(`https://attendancemarker.in/api/events/${eventId}`, { withCredentials: true }).subscribe(
        () => {
          this.fetchEvents(); // Refresh events list
        },
        (error) => {
          console.log(error);
          console.error('Error deleting event:', error);
        }
      );
    }
  }

  editEvent(eventId: string) {
    this.router.navigate(['/edit-event', eventId]); // Navigate to edit page
  }

  createEvent() {
    this.router.navigate(['/create-event']); // Navigate to create event page
  }
  downloadAttendance(eventId: string) {
    this.http.get(`https://attendancemarker.in/api/attendance/export/${eventId}`, { 
      responseType: 'blob', // Expect binary data
      withCredentials: true 
    }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `attendance_${eventId}.xlsx`;
      link.click();
    }, error => {
      console.error('Error downloading attendance:', error);
      console.log(error);
    });
  }
}
