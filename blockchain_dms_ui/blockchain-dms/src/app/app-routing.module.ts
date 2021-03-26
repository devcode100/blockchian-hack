import { ViewReliefRequestsComponent } from "./view-relief-requests/view-relief-requests.component";
import { RequestReliefComponent } from "./request-relief/request-relief.component";
import { UserRegistrationComponent } from "./user-registration/user-registration.component";
import { NgoComponent } from "./ngo/ngo.component";
import { SignupComponent } from "./signup/signup.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "./auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "ngo-registration",
    component: NgoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "user-registration",
    component: UserRegistrationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "relief-request",
    component: RequestReliefComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "view-relief-request",
    component: ViewReliefRequestsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
