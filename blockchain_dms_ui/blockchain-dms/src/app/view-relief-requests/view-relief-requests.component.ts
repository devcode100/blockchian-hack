import { RaiseHelpComponent } from "./../modal-dialog/raise-help/raise-help.component";
import { ReliefRequest } from "./../modal/ReliefRequest";
import { ReliefRequestService } from "./../relief-request.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Web3Service } from "../web3.service";
import { AuthService } from "../auth.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-view-relief-requests",
  templateUrl: "./view-relief-requests.component.html",
  styleUrls: ["./view-relief-requests.component.css"],
})
export class ViewReliefRequestsComponent implements OnInit {
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
    this._reliefRequestService.getAllReliefRequests().subscribe(
      (response: ReliefRequest[]) => {
        this.reliefRequestList = response;
        this.loggedInUserId = this._authService.userInfo.id;
      },
      (error) => {}
    );
  }

  beforePanelClosed(panel) {
    panel.isExpanded = false;
    console.log("Panel going to close!");
  }
  beforePanelOpened(panel) {
    panel.isExpanded = true;
    console.log("Panel going to  open!");
  }

  afterPanelClosed() {
    console.log("Panel closed!");
  }
  afterPanelOpened() {
    console.log("Panel opened!");
  }

  closeAllPanels() {
    this.Accordion.closeAll();
  }
  openAllPanels() {
    this.Accordion.openAll();
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

  raiseHepDialog(requestreliefData: ReliefRequest) {
    const dialogRef = this.dialog.open(RaiseHelpComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._reliefRequestService
          .updateReliefStatus(
            requestreliefData._id,
            "PENDING_APPROVAL",
            this._authService.userInfo.id
          )
          .subscribe(
            (response) => {
              this.web3Service
                .updateStatusAndMappedUser(
                  requestreliefData._id,
                  "PENDING_APPROVAL",
                  this._authService.userInfo.id
                )
                .then((data) => {
                  this.updateReliefRequestObject(response);
                  this._snackBar.open(
                    "Response for helping with relief goods has been send for approval!",
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
    });
  }

  updateReliefRequestObject(response) {
    let itemIndex = this.reliefRequestList.findIndex(
      (item) => item._id == response._id
    );
    this.reliefRequestList[itemIndex].status = response.status;
    this.reliefRequestList[itemIndex].userIdMapped = response.userIdMapped;
  }
}
