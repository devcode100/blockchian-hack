import { ReliefRequest } from "./../../modal/ReliefRequest";
import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "src/app/auth.service";
import { ReliefRequestService } from "src/app/relief-request.service";
import { Web3Service } from "src/app/web3.service";

@Component({
  templateUrl: "./help-shipping.component.html",
  styleUrls: ["./help-shipping.component.css"],
})
export class HelpShippingComponent implements OnInit {
  helpReliefForm: FormGroup;
  reliefData: ReliefRequest;
  constructor(
    private fb: FormBuilder,
    private _reliefRequestService: ReliefRequestService,
    private _web3Service: Web3Service,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<HelpShippingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reliefData = data.reliefRequest;
  }

  ngOnInit(): void {
    this.helpReliefForm = this.fb.group({
      reliefRequestId: [
        { value: this.reliefData._id, disabled: true },
        Validators.required,
      ],
      helpUserId: [
        { value: this.reliefData.userIdMapped, disabled: true },
        Validators.required,
      ],
      reliefDetails: ["", Validators.required],
      localAddress: ["", Validators.required],
      reliefPhotoHash: ["", Validators.required],
    });
  }

  saveHelpReliefDatails() {
    let helpReliefDetails = {
      reliefRequestId: this.helpReliefForm.get("reliefRequestId").value,
      helpUserId: this.helpReliefForm.get("helpUserId").value,
      reliefDetails: this.helpReliefForm.get("reliefDetails").value,
      localAddress: this.helpReliefForm.get("localAddress").value,
      reliefPhotoHash: this.helpReliefForm.get("reliefPhotoHash").value,
    };

    this._reliefRequestService
      .updateReliefStatus(
        helpReliefDetails.reliefRequestId,
        "GOODS_SHIPPED",
        helpReliefDetails.helpUserId
      )
      .subscribe(
        (response) => {
          this._web3Service
            .updateStatusAndMappedUser(
              helpReliefDetails.reliefRequestId,
              "GOODS_SHIPPED",
              helpReliefDetails.helpUserId
            )
            .then((data) => {
              this._web3Service
                .saveReliefHelperInfo(
                  helpReliefDetails.reliefRequestId,
                  helpReliefDetails.helpUserId,
                  helpReliefDetails.reliefDetails,
                  helpReliefDetails.localAddress,
                  helpReliefDetails.reliefPhotoHash
                )
                .then(
                  (finalData) => {
                    this.dialogRef.close(response);
                  },
                  (error) => {
                    this.dialogRef.close(null);
                  }
                );
            });
        },
        (error) => {
          this._snackBar.open("Unexpected Error occured!", "Close", {
            duration: 4000,
          });
        }
      );
  }
}
