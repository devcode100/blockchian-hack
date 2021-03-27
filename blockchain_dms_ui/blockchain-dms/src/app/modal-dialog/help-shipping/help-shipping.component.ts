import { ReliefRequest } from "./../../modal/ReliefRequest";
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
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReliefRequestService } from "src/app/relief-request.service";
import { Web3Service } from "src/app/web3.service";

@Component({
  templateUrl: "./help-shipping.component.html",
  styleUrls: ["./help-shipping.component.css"],
})
export class HelpShippingComponent implements OnInit {
  helpReliefForm: FormGroup;
  reliefData: ReliefRequest;
  releafFileName = "Select File";
  @ViewChild("UploadFileInput") uploadFileInput: ElementRef;
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
      reliefPhotoFile: [""],
      releafFileName: ["", Validators.required],
    });
  }

  saveHelpReliefDatails() {
    let helpReliefDetails = {
      reliefRequestId: this.helpReliefForm.get("reliefRequestId").value,
      helpUserId: this.helpReliefForm.get("helpUserId").value,
      reliefDetails: this.helpReliefForm.get("reliefDetails").value,
      localAddress: this.helpReliefForm.get("localAddress").value,
      reliefPhotoHash: this.helpReliefForm.get("releafFileName").value,
      reliefPhotoFile: this.helpReliefForm.get("reliefPhotoFile").value,
    };
    this._reliefRequestService
      .uplaodFileToIpfs(helpReliefDetails.reliefPhotoFile)
      .subscribe(
        (ipfs: any) => {
          this._reliefRequestService
            .updateReliefStatusAndGoodPhotoHash(
              helpReliefDetails.reliefRequestId,
              "GOODS_SHIPPED",
              helpReliefDetails.helpUserId,
              ipfs[0].hash
            )
            .subscribe(
              (response) => {
                this._web3Service
                  .updateStatusMappedHelperGoodsHash(
                    helpReliefDetails.reliefRequestId,
                    "GOODS_SHIPPED",
                    helpReliefDetails.helpUserId,
                    ipfs[0].hash
                  )
                  .then((data) => {
                    this._web3Service
                      .saveReliefHelperInfo(
                        helpReliefDetails.reliefRequestId,
                        helpReliefDetails.helpUserId,
                        helpReliefDetails.reliefDetails,
                        helpReliefDetails.localAddress,
                        ipfs[0].hash
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
        },
        (error) => {}
      );
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.releafFileName = "";

      Array.from(fileInput.target.files).forEach((file: File) => {
        this.helpReliefForm.patchValue({
          reliefPhotoFile: fileInput.target.files[0],
        });
        this.releafFileName += file.name;
      });

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.releafFileName = "Select File";
    }
    this.helpReliefForm.patchValue({
      releafFileName: this.releafFileName,
    });
  }
}
