import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: "./raise-help.component.html",
  styleUrls: ["./raise-help.component.css"],
})
export class RaiseHelpComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<RaiseHelpComponent>) {}

  ngOnInit(): void {}

  closeDialog(response: boolean) {
    this.dialogRef.close(response);
  }
}
