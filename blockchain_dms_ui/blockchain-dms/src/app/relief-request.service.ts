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

  getAllReliefRequests() {
    return this._httpClient.get(
      "http://localhost:8080/api/all/relief-requests",
      {
        headers: new HttpHeaders({
          "x-access-token": this._authService.getToken(),
        }),
      }
    );
  }

  updateReliefStatus(
    _requestId: string,
    newStatus: string,
    mappedUserId: string
  ) {
    return this._httpClient.put(
      "http://localhost:8080/api/update/relief-requests-status/" +
        _requestId +
        "/" +
        newStatus +
        "/" +
        mappedUserId,
      null,
      {
        headers: new HttpHeaders({
          "x-access-token": this._authService.getToken(),
        }),
      }
    );
  }

  updateReliefStatusAndGoodPhotoHash(
    _requestId: string,
    newStatus: string,
    mappedUserId: string,
    reliefPhotoHash: string
  ) {
    return this._httpClient.put(
      "http://localhost:8080/api/update/relief-requests-status-photo/" +
        _requestId +
        "/" +
        newStatus +
        "/" +
        mappedUserId +
        "/" +
        reliefPhotoHash,
      null,
      {
        headers: new HttpHeaders({
          "x-access-token": this._authService.getToken(),
        }),
      }
    );
  }

  updateReceivedStatusAndPhoto(
    _requestId: string,
    newStatus: string,
    mappedUserId: string,
    notes: string,
    reliefReceivedPhotoHash: string,
    goodsReceivedDate: string
  ) {
    return this._httpClient.put(
      "http://localhost:8080/api/update/relief-received-status",

      {
        id: _requestId,
        updatedStatus: newStatus,
        userMappedId: mappedUserId,
        notes: notes,
        receivedGoodsPhotoHash: reliefReceivedPhotoHash,
        goodsReceivedDate: goodsReceivedDate,
      },
      {
        headers: new HttpHeaders({
          "x-access-token": this._authService.getToken(),
        }),
      }
    );
  }

  getMyRequests(_requestId: string) {
    return this._httpClient.get(
      "http://localhost:8080/api/my/relief-requests/" + _requestId,
      {
        headers: new HttpHeaders({
          "x-access-token": this._authService.getToken(),
        }),
      }
    );
  }
}
