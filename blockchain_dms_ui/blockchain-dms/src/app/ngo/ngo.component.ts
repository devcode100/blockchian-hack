import { Web3Service } from "./../web3.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import * as moment from "moment";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-ngo",
  templateUrl: "./ngo.component.html",
  styleUrls: ["./ngo.component.css"],
})
export class NgoComponent implements OnInit {
  ngoRegisterForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _web3Service: Web3Service
  ) {}

  ngOnInit(): void {
    this.ngoRegisterForm = this.fb.group({
      ngoName: ["", Validators.required],
      state: ["", Validators.required],
      district: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.email],
      establishedDate: ["", Validators.required],
    });
  }

  registerNGO() {
    this._web3Service
      .saveNgoRegistrationDetails(
        this.ngoRegisterForm.get("ngoName").value,
        this.ngoRegisterForm.get("state").value,
        this.ngoRegisterForm.get("district").value,
        this.ngoRegisterForm.get("phoneNumber").value,
        this.ngoRegisterForm.get("email").value,
        moment(this.ngoRegisterForm.get("establishedDate").value).format(
          "YYYY-MM-DD"
        )
      )
      .then(
        (response) => {
          this._web3Service
            .updateIsRegisteredFlag(this.authService.userInfo.id, true)
            .then(
              (completed) => {
                this.authService.isNGORegistered.next(true);
                this.router.navigate(["/view-relief-request"]);
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
            "NGO Registration is  failed.Please check with aministrator",
            "Close",
            {
              duration: 2000,
            }
          );
        }
      );
  }
}
