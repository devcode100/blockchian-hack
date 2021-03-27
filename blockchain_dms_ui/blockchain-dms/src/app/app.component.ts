import { ReliefRequestService } from "src/app/relief-request.service";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { LoadEthService } from "./load-eth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  isNGORegistered: boolean;
  isUserRolerRegistered: boolean;

  constructor(
    private _loadEthService: LoadEthService,
    public authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _reliefRequestService: ReliefRequestService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(
      (response) => {
        this.isAuthenticated = response;
      },
      (error) => {
        this.isAuthenticated = false;
      }
    );

    this.authService.isNGORegistered.subscribe(
      (response) => {
        this.isNGORegistered = response;
      },
      (error) => {
        this.isNGORegistered = false;
      }
    );
    this.authService.isUserRolerRegistered.subscribe(
      (response) => {
        this.isUserRolerRegistered = response;
      },
      (error) => {
        this.isUserRolerRegistered = false;
      }
    );
  }

  logout() {
    this.authService.removeToken();
    this.authService.isAuthenticated.next(false);
    this._snackBar.open("Logout successful", "Close", {
      duration: 4000,
    });
    this.router.navigate([""]);
  }
}
