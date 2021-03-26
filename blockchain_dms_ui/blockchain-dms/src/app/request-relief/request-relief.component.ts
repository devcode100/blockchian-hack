import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-request-relief",
  templateUrl: "./request-relief.component.html",
  styleUrls: ["./request-relief.component.css"],
})
export class RequestReliefComponent implements OnInit {
  requestReliefForm: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
