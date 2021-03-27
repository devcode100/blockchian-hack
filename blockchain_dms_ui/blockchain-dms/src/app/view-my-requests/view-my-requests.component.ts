import { HelpShippingComponent } from "./../modal-dialog/help-shipping/help-shipping.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatAccordion } from "@angular/material/expansion";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../auth.service";
import { UserMasterComponent } from "../modal-dialog/user-master/user-master.component";
import { ReliefRequest } from "../modal/ReliefRequest";
import { ReliefRequestService } from "../relief-request.service";
import { Web3Service } from "../web3.service";

@Component({
  selector: "app-view-my-requests",
  templateUrl: "./view-my-requests.component.html",
  styleUrls: ["./view-my-requests.component.css"],
})
export class ViewMyRequestsComponent implements OnInit {
  reliefRequestList: ReliefRequest[];
  loggedInUserId: string;
  @ViewChild("accordion", { static: true }) Accordion: MatAccordion;
  constructor(
    private _reliefRequestService: ReliefRequestService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private web3Service: Web3Service,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._reliefRequestService
      .getMyRequests(this._authService.userInfo.id)
      .subscribe(
        (response: ReliefRequest[]) => {
          this.reliefRequestList = response;
          this.loggedInUserId = this._authService.userInfo.id;
        },
        (error) => {}
      );
  }

  checkIfValid(requestId) {
    this.web3Service.checkIsRequestValid(requestId).then(
      (response) => {
        if (response) {
          this._snackBar.open("Relief Request is valid", "Close", {
            duration: 5000,
          });
        } else {
          this._snackBar.open("Relief Request is not valid", "Close", {
            duration: 5000,
          });
        }
      },
      (error) => {
        this._snackBar.open("Un expected error occured", "Close", {
          duration: 2000,
        });
      }
    );
  }

  viewMasterInfo(userIdMapped: string) {
    this.web3Service.displayUserMasterDetails(userIdMapped).then(
      (response) => {
        const dialogRef = this.dialog.open(UserMasterComponent, {
          width: "500px",
          data: { userMasterData: response },
        });

        dialogRef.afterClosed().subscribe((result) => {});
      },
      (error) => {}
    );
  }

  confirmResponse(requestreliefData: ReliefRequest) {
    this._reliefRequestService
      .updateReliefStatus(
        requestreliefData._id,
        "AWAITING_RELIEF_GOODS",
        requestreliefData.userIdMapped
      )
      .subscribe(
        (response) => {
          this.web3Service
            .updateStatusAndMappedUser(
              requestreliefData._id,
              "AWAITING_RELIEF_GOODS",
              requestreliefData.userIdMapped
            )
            .then((data) => {
              this.updateReliefRequestObject(response);
              this._snackBar.open(
                "Requester has approved the releaf response.",
                "Close",
                {
                  duration: 4000,
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

  updateReliefRequestObject(response) {
    let itemIndex = this.reliefRequestList.findIndex(
      (item) => item._id == response._id
    );
    this.reliefRequestList[itemIndex].status = response.status;
    this.reliefRequestList[itemIndex].userIdMapped = response.userIdMapped;
  }

  initiateShipping(reliefRequest: ReliefRequest) {
    const dialogRef = this.dialog.open(HelpShippingComponent, {
      height: "50vh",
      width: "50vw",
      data: { reliefRequest: reliefRequest },
    });

    dialogRef.afterClosed().subscribe((reliefData) => {
      if (reliefData != null) {
        this.updateReliefRequestObject(reliefData);
        this._snackBar.open(
          "Shipping of relief of goods successfully completed",
          "Close",
          {
            duration: 4000,
          }
        );
      } else {
        this._snackBar.open(
          "Unexpected error occured.Please contact administrator!",
          "Close",
          {
            duration: 4000,
          }
        );
      }
    });
  }

  confirmGoodsReceived(reliefRequest: ReliefRequest) {}
}
