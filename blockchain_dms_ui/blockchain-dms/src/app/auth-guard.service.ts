import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate() {
    // redirect to some view explaining what happened
    if (this.authService.isLoginValid()) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
