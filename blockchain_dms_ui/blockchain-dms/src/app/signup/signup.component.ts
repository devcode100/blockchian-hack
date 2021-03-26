import { Web3Service } from "./../web3.service";
import { SignUp } from "./../modal/SignUp";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  7;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private web3Service: Web3Service
  ) {}

  rolesList: string[] = ["USER", "TRANSPORT_AGENCY", "NGO", "LAW"];

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.email],
      password: ["", Validators.required],
      roles: ["", Validators.required],
    });
  }
  signUp() {
    const signUp: SignUp = {
      username: this.form.get("username").value,
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      roles: this.form.get("roles").value,
    };
    this.authService.signUp(signUp).subscribe(
      (response: any) => {
        this.web3Service
          .addUserDetails(
            response.id,
            this.form.get("username").value,
            this.form.get("roles").value[0],
            false
          )
          .then(
            (data) => {
              console.log("ETH SM transaction [] : ", data);
            },
            (error) => {
              console.log("ETH SM transaction [] : ", error);
            }
          );
        this.router.navigate(["/login"]);
        this._snackBar.open(
          this.form.get("username").value + " is successfully registered.",
          "Close",
          {
            duration: 5000,
          }
        );
      },
      (error) => {}
    );
  }
}
