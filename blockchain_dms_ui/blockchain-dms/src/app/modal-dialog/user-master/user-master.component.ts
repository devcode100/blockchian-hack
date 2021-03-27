import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "./user-master.component.html",
  styleUrls: ["./user-master.component.css"],
})
export class UserMasterComponent implements OnInit {
  masterData: any;
  constructor(
    private dialogRef: MatDialogRef<UserMasterComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.masterData = data.userMasterData;
  }

  ngOnInit(): void {}
  closeDialog(response: boolean) {
    this.dialogRef.close(response);
  }
}
