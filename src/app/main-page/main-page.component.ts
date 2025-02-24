import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  standalone:true,
  imports: [CommonModule],
  styleUrls: ['./main-page.component.css']
})



export class MainPageComponent implements OnInit {
  events: any[] = [];
  errorMessage = '';
  constructor(
    private http: HttpClient,
    private router: Router,) {}


  ngOnInit(): void {
    this.fetchEvents();
  }

  // fetchEvents(): void {
  //   this.http.get<any[]>('http://localhost:5000/api/events').subscribe({
  //     next: (data) => {
  //       // Filter and sort events
  //       const today = new Date(); // Get the current date
  //       this.events = data
  //         .filter(event => new Date(event.date) >= today) // Include only today/upcoming events
  //         .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()); // Sort by time
  //     },
  //     error: () => {
  //       this.errorMessage = 'Failed to load events.';
  //     }
  //   });
  // 
  
  fetchEvents(): void {
    this.http.get<any[]>('https://attendancemarker.in/api/events', { withCredentials: true }).subscribe({
      next: (data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the start of the day

        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1); // Get the previous day's date

        this.events = data
          .filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0); // Normalize event date for comparison
            return eventDate >= yesterday; // Include yesterday, today, and future events
          })
          .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            if (dateA !== dateB) {
              return dateA - dateB; // Sort by date first
            }
            return new Date(a.time).getTime() - new Date(b.time).getTime(); // Then by time
          });
      },
      error: () => {
        this.errorMessage = 'Failed to load events.';
      }
    });
}

  openEventDetails(eventId: string): void {
    this.router.navigate(['/event-details', eventId]);
  }
}
