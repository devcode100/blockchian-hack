import { SignIn } from "./../modal/SignIn";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { NgoConfirmComponent } from "../modal-dialog/ngo-confirm/ngo-confirm.component";
import { UserConfirmComponent } from "../modal-dialog/user-confirm/user-confirm.component";
import { Web3Service } from "../web3.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private _web3Service: Web3Service
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      const username = this.form.get("username").value;
      const password = this.form.get("password").value;
      const signIn: SignIn = {
        username: username,
        password: password,
      };
      this.authService.signIn(signIn).subscribe(
        (response: any) => {
          this.authService.addToken(response.accessToken);
          this.authService.saveUserDetails(response);
          this.authService.isAuthenticated.next(true);
          //check if user is registered in system:
          this._web3Service
            .checkIfUserisRegistered(response.id)
            .then((isRegistered) => {
              if (!isRegistered) {
                if (this.authService.checkIfRoleIsNGO(response)) {
                  this.authService.isNGORegistered.next(false);
                  this.openNGODialog();
                }
                if (this.authService.checkIfRoleIsUSER(response)) {
                  this.authService.isUserRolerRegistered.next(false);
                  this.openUserDialog();
                }
              }
            });
          this.router.navigate(["/view-relief-request"]);
          this._snackBar.open("Login successful.", "Close", {
            duration: 2000,
          });
        },
        (error) => {
          this._snackBar.open(
            "Authentication Failed, Please check the credentials and try again!",
            "Close",
            {
              duration: 2000,
            }
          );
        }
      );
    }
  }

  openNGODialog() {
    const dialogRef = this.dialog.open(NgoConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/ngo-registration"]);
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(UserConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/user-registration"]);
      } else {
        this.router.navigate(["/"]);
      }
    });
  }
}
