import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: "./user-confirm.component.html",
  styleUrls: ["./user-confirm.component.css"],
})
export class UserConfirmComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<UserConfirmComponent>) {}

  ngOnInit(): void {}
  closeDialog(response: boolean) {
    this.dialogRef.close(response);
  }
}
