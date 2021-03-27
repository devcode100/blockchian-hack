import { Component, Inject, OnInit, Optional } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReliefRequest } from "src/app/modal/ReliefRequest";
import { ReliefRequestService } from "src/app/relief-request.service";
import { Web3Service } from "src/app/web3.service";
import * as moment from "moment";

@Component({
  templateUrl: "./relief-received.component.html",
  styleUrls: ["./relief-received.component.css"],
})
export class ReliefReceivedComponent implements OnInit {
  reliefReceivedForm: FormGroup;
  reliefData: ReliefRequest;
  constructor(
    private fb: FormBuilder,
    private _reliefRequestService: ReliefRequestService,
    private _web3Service: Web3Service,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ReliefReceivedComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reliefData = data.reliefRequest;
  }

  ngOnInit(): void {
    this.reliefReceivedForm = this.fb.group({
      reliefRequestId: [
        { value: this.reliefData._id, disabled: true },
        Validators.required,
      ],
      helpUserId: [
        { value: this.reliefData.userIdMapped, disabled: true },
        Validators.required,
      ],
      receiveNote: ["", Validators.required],
      receivedPhotoHash: ["", Validators.required],
    });
  }

  confirmGoodsReceived() {
    if (!this.reliefReceivedForm.valid) {
      return;
    }
    let reliefReceivedData = {
      requestId: this.reliefReceivedForm.get("reliefRequestId").value,
      newStatus: "RELIEF_RECEIVE_CONFIRMED",
      helpUserId: this.reliefReceivedForm.get("helpUserId").value,
      receiveNote: this.reliefReceivedForm.get("receiveNote").value,
      receivedPhotoHash: this.reliefReceivedForm.get("receivedPhotoHash").value,
      goodsReceivedDate: moment(new Date()).format("YYYY-MM-DD"),
    };

    this._reliefRequestService
      .updateReceivedStatusAndPhoto(
        reliefReceivedData.requestId,
        reliefReceivedData.newStatus,
        reliefReceivedData.helpUserId,
        reliefReceivedData.receiveNote,
        reliefReceivedData.receivedPhotoHash,
        reliefReceivedData.goodsReceivedDate
      )
      .subscribe(
        (response) => {
          this._web3Service
            .updateStatusMappedReceiveGoodsHash(
              reliefReceivedData.requestId,
              reliefReceivedData.newStatus,
              reliefReceivedData.helpUserId,
              reliefReceivedData.receivedPhotoHash,
              reliefReceivedData.goodsReceivedDate
            )
            .then(
              (transaction) => {
                this.dialogRef.close(response);
              },
              (error) => {}
            );
        },
        (error) => {}
      );
  }
}
