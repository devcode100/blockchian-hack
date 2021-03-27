import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
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
  releafFileName = "Select File";
  @ViewChild("UploadFileInput") uploadFileInput: ElementRef;
  constructor(
    private fb: FormBuilder,
    private _reliefRequestService: ReliefRequestService,
    private _web3Service: Web3Service,
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
      receivedPhotoFile: ["", Validators.required],
      releafFileName: ["", Validators.required],
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
      receivedPhotoHash: this.reliefReceivedForm.get("releafFileName").value,
      receivedPhotoFile: this.reliefReceivedForm.get("receivedPhotoFile").value,
      goodsReceivedDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    this._reliefRequestService
      .uplaodFileToIpfs(reliefReceivedData.receivedPhotoFile)
      .subscribe(
        (ipfs: any) => {
          this._reliefRequestService
            .updateReceivedStatusAndPhoto(
              reliefReceivedData.requestId,
              reliefReceivedData.newStatus,
              reliefReceivedData.helpUserId,
              reliefReceivedData.receiveNote,
              ipfs[0].hash,
              reliefReceivedData.goodsReceivedDate
            )
            .subscribe(
              (response) => {
                this._web3Service
                  .updateStatusMappedReceiveGoodsHash(
                    reliefReceivedData.requestId,
                    reliefReceivedData.newStatus,
                    reliefReceivedData.helpUserId,
                    ipfs[0].hash,
                    reliefReceivedData.goodsReceivedDate
                  )
                  .then(
                    (transaction) => {
                      this.dialogRef.close(response);
                    },
                    (error) => {
                      this.dialogRef.close(null);
                    }
                  );
              },
              (error) => {
                this.dialogRef.close(null);
              }
            );
        },
        (error) => {
          this.dialogRef.close(null);
        }
      );
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.releafFileName = "";

      Array.from(fileInput.target.files).forEach((file: File) => {
        this.reliefReceivedForm.patchValue({
          receivedPhotoFile: fileInput.target.files[0],
        });
        this.releafFileName += file.name;
      });

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.releafFileName = "Select File";
    }
    this.reliefReceivedForm.patchValue({
      releafFileName: this.releafFileName,
    });
  }
}
