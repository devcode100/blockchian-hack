import { Web3Service } from "./../web3.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import * as moment from "moment";

@Component({
  selector: "app-user-registration",
  templateUrl: "./user-registration.component.html",
  styleUrls: ["./user-registration.component.css"],
})
export class UserRegistrationComponent implements OnInit {
  userRegisterForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private web3Service: Web3Service
  ) {}

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      name: ["", Validators.required],
      age: ["", Validators.required],
      email: [
        { value: this.authService.userInfo.email, disabled: true },
        Validators.email,
      ],
      state: ["", Validators.required],
      district: ["", Validators.required],
      dob: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      profession: ["", Validators.required],
    });
  }

  registerUser() {
    this.web3Service
      .saveUserRegistrationDetails(
        this.userRegisterForm.get("name").value,
        this.userRegisterForm.get("age").value,
        this.userRegisterForm.get("state").value,
        this.userRegisterForm.get("district").value,
        moment(this.userRegisterForm.get("dob").value).format("YYYY-MM-DD"),
        this.userRegisterForm.get("phoneNumber").value,
        this.userRegisterForm.get("profession").value
      )
      .then(
        (response) => {
          this.web3Service
            .updateIsRegisteredFlag(this.authService.userInfo.id, true)
            .then(
              (completed) => {
                this.authService.isUserRolerRegistered.next(true);
                this.router.navigate(["/"]);
                this._snackBar.open(
                  "NGO Registration is  successful.",
                  "Close",
                  {
                    duration: 2000,
                  }
                );
              },
              (error) => {
                this._snackBar.open(
                  "User Registration is  failed.Please check with aministrator",
                  "Close",
                  {
                    duration: 2000,
                  }
                );
              }
            );
        },
        (error) => {
          this._snackBar.open(
            "User Registration is  failed.Please check with aministrator",
            "Close",
            {
              duration: 2000,
            }
          );
        }
      );
  }
}
