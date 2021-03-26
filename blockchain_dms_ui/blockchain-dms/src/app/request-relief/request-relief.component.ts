import { Web3Service } from "./../web3.service";
import { ReliefRequestService } from "./../relief-request.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ReliefRequest } from "../modal/ReliefRequest";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-request-relief",
  templateUrl: "./request-relief.component.html",
  styleUrls: ["./request-relief.component.css"],
})
export class RequestReliefComponent implements OnInit {
  requestReliefForm: FormGroup;
  statusList = ["INITIATED", "MAPPED", "APPROVED", "RECEIVED"];
  severityList = ["HIGH", "LOW"];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _reliefRequestService: ReliefRequestService,
    private _web3Service: Web3Service,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.requestReliefForm = this.fb.group({
      state: ["", Validators.required],
      userId: [this.authService.userInfo.id, Validators.required],
      district: ["", Validators.required],
      email: ["", Validators.email],
      typeOfCalamity: ["", Validators.required],
      requirement: ["", Validators.required],
      severity: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      expectedDelivery: ["", Validators.required],
      userIdMapped: ["", Validators.required],
      status: ["", Validators.required],
    });
  }

  saveReliefRequest() {
    if (!this.requestReliefForm.valid) {
      return;
    }
    let _reliefRequest: any = {};
    _reliefRequest.state = this.requestReliefForm.get("state").value;
    _reliefRequest.userId = this.requestReliefForm.get("userId").value;
    _reliefRequest.district = this.requestReliefForm.get("district").value;
    _reliefRequest.email = this.requestReliefForm.get("email").value;
    _reliefRequest.severity = this.requestReliefForm.get("severity").value;
    _reliefRequest.requirement = this.requestReliefForm.get("severity").value;
    _reliefRequest.typeOfCalamity = this.requestReliefForm.get(
      "typeOfCalamity"
    ).value;
    _reliefRequest.phoneNumber = this.requestReliefForm.get(
      "phoneNumber"
    ).value;
    _reliefRequest.expectedDelivery = this.requestReliefForm.get(
      "expectedDelivery"
    ).value;
    _reliefRequest.userIdMapped = this.requestReliefForm.get(
      "userIdMapped"
    ).value;
    _reliefRequest.status = this.requestReliefForm.get("status").value;

    this._reliefRequestService.saveReliefRequest(_reliefRequest).subscribe(
      (response: any) => {
        this._web3Service
          .saveReliefRequest(
            response.id,
            _reliefRequest.userId,
            "",
            _reliefRequest.status
          )
          .then(
            (success) => {
              this._snackBar.open(
                "Relief Request Successfully logged",
                "Close",
                {
                  duration: 4000,
                }
              );
            },
            (error) => {
              this._snackBar.open(
                "Relief Request failed.Please contact Administrator",
                "Close",
                {
                  duration: 4000,
                }
              );
            }
          );
      },
      (error) => {}
    );
  }

  validateUserMapped() {
    if (this.requestReliefForm.get("userIdMapped").value) {
      return true;
    } else {
      return false;
    }
  }
}
