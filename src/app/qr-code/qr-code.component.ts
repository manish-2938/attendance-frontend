import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css'],
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
})
export class QrCodeComponent implements OnInit {
  @Input() eventId: string ='';
  @Input() eventName: string = '';
  @Input() firstName: string ='';
  @Input() lastName: string ='';
  @Input() rollNumber: string = '';
  @Input() department: string = '';
 
  qrData: string = '';

  ngOnInit(): void {
    console.log(this.firstName)
    // Generate QR data as JSON string
    this.qrData = JSON.stringify({
      eventName:this.eventName,
      eventId: this.eventId,
      firstName: this.firstName,
      lastName: this.lastName,
      rollNumber: this.rollNumber,
      department: this.department,
    });
  }
}
