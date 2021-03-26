import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: "./ngo-confirm.component.html",
  styleUrls: ["./ngo-confirm.component.css"],
})
export class NgoConfirmComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<NgoConfirmComponent>) {}

  ngOnInit(): void {}

  closeDialog(response: boolean) {
    this.dialogRef.close(response);
  }
}
