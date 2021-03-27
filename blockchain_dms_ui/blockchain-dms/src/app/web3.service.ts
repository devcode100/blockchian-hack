import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { LoadEthService } from "./load-eth.service";
const userMasterContractAddress = "0x27E13E3D90b5392496A52A02dA0c560319b21161";
const userMasterContractABI = require("../deployed-smart-contract/UserMaster.json");
//-------------------
const ngoRegContractAddress = "0x8375FEdE8B8e0C886aF54FF33f79D5E21D76cb7E";
const ngoRegContractABI = require("../deployed-smart-contract/NgoRegistration.json");
//-------------------
const userRegContractAddress = "0x4E4B3971a1Aa0a81520EE4AEa8D7c4dB73E4409f";
const userRegContractABI = require("../deployed-smart-contract/UserRegistration.json");
//-------------------
const reliefRequestContractAddress =
  "0x907FB50AE6E0cac68828d90814afef41F249385F";
const reliefRequestContractABI = require("../deployed-smart-contract/ReliefRequest.json");
//-------------------
const helperContractAddress = "0x38c455A33e9f547970f4D2c446a5194593467Ed2";
const helperContractABI = require("../deployed-smart-contract/HelperContract.json");
//-------------------
let userMasterInstance = undefined;
let ngoRegInstance = undefined;
let userRegInstance = undefined;
let reliefRequestInstance = undefined;
let helperContractInstance = undefined;
let etherAccount;
@Injectable({
  providedIn: "root",
})
export class Web3Service {
  constructor(
    private _loadEthService: LoadEthService,
    private _authService: AuthService
  ) {
    userMasterInstance = new window["web3"].eth.Contract(
      userMasterContractABI.abi,
      userMasterContractAddress
    );
    //-------------------
    ngoRegInstance = new window["web3"].eth.Contract(
      ngoRegContractABI.abi,
      ngoRegContractAddress
    );
    //-------------------
    userRegInstance = new window["web3"].eth.Contract(
      userRegContractABI.abi,
      userRegContractAddress
    );
    //-------------------
    reliefRequestInstance = new window["web3"].eth.Contract(
      reliefRequestContractABI.abi,
      reliefRequestContractAddress
    );
    //-------------------
    helperContractInstance = new window["web3"].eth.Contract(
      helperContractABI.abi,
      helperContractAddress
    );
    //-------------------
    this._loadEthService.getEthAccount().then(
      (account) => {
        etherAccount = account;
      },
      () => {
        etherAccount = null;
      }
    );
  }

  getContarctInstance() {
    return userMasterInstance;
  }

  addUserDetails(
    _id: number,
    _username: string,
    _role: string,
    _isRegistered: boolean
  ) {
    return userMasterInstance.methods
      .addUserDetails(_id, _username, _role, _isRegistered)
      .send({ from: etherAccount[0] });
  }

  checkIfUserisRegistered(_id: string) {
    return userMasterInstance.methods.checkIfUserisRegistered(_id).call();
  }

  saveNgoRegistrationDetails(
    _name: string,
    _state: string,
    _district: string,
    _phoneNumber: string,
    _emailAddress: string,
    _establishedDate: string
  ) {
    return ngoRegInstance.methods
      .saveUserRegistrationDetails(
        this._authService.userInfo.id,
        _name,
        _state,
        _district,
        _phoneNumber,
        _emailAddress,
        _establishedDate
      )
      .send({ from: etherAccount[0] });
  }
  saveUserRegistrationDetails(
    _name: string,
    _age: number,
    _state: string,
    _district: string,
    _dob: string,
    _phoneNumber: string,
    _profession: string
  ) {
    return userRegInstance.methods
      .saveUserRegistrationDetails(
        this._authService.userInfo.id,
        _name,
        _age,
        _state,
        _district,
        _dob,
        _phoneNumber,
        _profession
      )
      .send({ from: etherAccount[0] });
  }

  updateIsRegisteredFlag(_id: string, isRegistered: boolean) {
    return userMasterInstance.methods
      .updateisRegisteredData(_id, isRegistered)
      .send({ from: etherAccount[0] });
  }

  saveReliefRequest(
    _requestId: string,
    _userId: string,
    _userMappedId: string,
    _status: string
  ) {
    return reliefRequestInstance.methods
      .saveReliefRequest(_requestId, _userId, _userMappedId, _status)
      .send({ from: etherAccount[0] });
  }

  checkIsRequestValid(_requestId: string) {
    return reliefRequestInstance.methods.checkIsRequestValid(_requestId).call();
  }

  updateStatusAndMappedUser(
    _requestId: string,
    _newStatus: string,
    _mappedUserId: string
  ) {
    return reliefRequestInstance.methods
      .updateStatusAndMappedUser(_requestId, _newStatus, _mappedUserId)
      .send({ from: etherAccount[0] });
  }

  updateStatusMappedHelperGoodsHash(
    _requestId: string,
    _newStatus: string,
    _mappedUserId: string,
    _reliefPhotoHash: string
  ) {
    return reliefRequestInstance.methods
      .updateStatusMappedHelperGoodsHash(
        _requestId,
        _newStatus,
        _mappedUserId,
        _reliefPhotoHash
      )
      .send({ from: etherAccount[0] });
  }

  updateStatusMappedReceiveGoodsHash(
    _requestId: string,
    _newStatus: string,
    _mappedUserId: string,
    _receivedPhotoHash: string,
    _goodsReceivedDate: string
  ) {
    return reliefRequestInstance.methods
      .updateStatusMappedReceiveGoodsHash(
        _requestId,
        _newStatus,
        _mappedUserId,
        _receivedPhotoHash,
        _goodsReceivedDate
      )
      .send({ from: etherAccount[0] });
  }

  displayUserMasterDetails(_userMasterid: string) {
    return userRegInstance.methods.displayDetails(_userMasterid).call();
  }

  saveReliefHelperInfo(
    _reliefRequestId: string,
    _helpUserId: string,
    _localAddress: string,
    _reliefDetails: string,
    _reliefPhotoHash: string
  ) {
    return helperContractInstance.methods
      .saveReliefHelperInfo(
        _reliefRequestId,
        _helpUserId,
        _localAddress,
        _reliefDetails,
        _reliefPhotoHash
      )
      .send({ from: etherAccount[0] });
  }
}
