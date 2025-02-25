import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QrCodeComponent } from '../qr-code/qr-code.component';

@Component({
  selector: 'app-event-details',
  templateUrl: 'event-details.component.html',
  standalone:true,
  imports: [CommonModule,QrCodeComponent],
  styles: [],
})
export class EventDetailsComponent implements OnInit {
  event: any = null;
  qrCode: boolean = false;
  student:any = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get('https://attendance-marker.up.railway.app/api/students/getStudent', { withCredentials: true })
    .subscribe({
      next: (data) => {
        this.student = data;
      },
      error: () => {
        console.error('Failed to fetch student details.');
      }
    });
    const eventId = this.route.snapshot.paramMap.get('id');
    this.fetchEventDetails(eventId);
  }

  fetchEventDetails(eventId: string | null): void {
    if (eventId) {
      this.http
        .get<any>(`https://attendance-marker.up.railway.app/api/events/${eventId}`, {withCredentials: true})
        .subscribe({
          next: (data) => {
            this.event = data;
          },
          error: () => {
            console.error('Failed to fetch event details.');
          },
        });
    }
  }

  generateQRCode(): void {
    this.qrCode = true;
  }

  isEntryAllowed(): boolean {
    const now = new Date();
    const eventDate = new Date(this.event.date);
    const entryDateTime = new Date(eventDate.setHours(
        new Date(this.event.startTime).getHours(), 
        new Date(this.event.startTime).getMinutes()
    ));
    return now <= entryDateTime;
}

}
