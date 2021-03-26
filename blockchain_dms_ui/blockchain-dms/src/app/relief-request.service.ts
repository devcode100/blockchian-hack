import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReliefRequest } from "./modal/ReliefRequest";

@Injectable({
  providedIn: "root",
})
export class ReliefRequestService {
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  saveReliefRequest(_reliefRequest: ReliefRequest) {
    return this._httpClient.post(
      "http://localhost:8080/api/post/relief-request",
      _reliefRequest,
      {
        headers: new HttpHeaders({
          "x-access-token": this._authService.getToken(),
        }),
      }
    );
  }
}
