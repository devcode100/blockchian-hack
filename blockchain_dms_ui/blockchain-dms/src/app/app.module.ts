import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { SignupComponent } from "./signup/signup.component";
import { NgoComponent } from "./ngo/ngo.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { NgoConfirmComponent } from "./modal-dialog/ngo-confirm/ngo-confirm.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { UserConfirmComponent } from "./modal-dialog/user-confirm/user-confirm.component";
import { RequestReliefComponent } from "./request-relief/request-relief.component";
import { ViewReliefRequestsComponent } from "./view-relief-requests/view-relief-requests.component";
import { RaiseHelpComponent } from './modal-dialog/raise-help/raise-help.component';
import { ViewMyRequestsComponent } from './view-my-requests/view-my-requests.component';
import { UserMasterComponent } from './modal-dialog/user-master/user-master.component';
import { HelpShippingComponent } from './modal-dialog/help-shipping/help-shipping.component';
import { ReliefReceivedComponent } from './modal-dialog/relief-received/relief-received.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NgoComponent,
    NgoConfirmComponent,
    UserRegistrationComponent,
    UserConfirmComponent,
    RequestReliefComponent,
    ViewReliefRequestsComponent,
    RaiseHelpComponent,
    ViewMyRequestsComponent,
    UserMasterComponent,
    HelpShippingComponent,
    ReliefReceivedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
