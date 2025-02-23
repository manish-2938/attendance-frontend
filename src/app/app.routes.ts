import { Route } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminSignUpComponent } from './admin-signup/admin-signup.cmponent';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'main', component:MainPageComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'qr-scanner', component: QrCodeScannerComponent },
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'admin-signup', component: AdminSignUpComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
]
