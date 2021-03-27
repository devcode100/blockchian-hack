import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { LoadEthService } from "./load-eth.service";
const userMasterContractAddress = "0xc92E92eC5C345522729F33533af42C8892E3D2f7";
const userMasterContractABI = require("../deployed-smart-contract/UserMaster.json");
//-------------------
const ngoRegContractAddress = "0x6198c99EaCBC058141d899b4B25E69Fd27157450";
const ngoRegContractABI = require("../deployed-smart-contract/NgoRegistration.json");
//-------------------
const userRegContractAddress = "0xF51229A4227d6A598EFE0E77793228137e66bf93";
const userRegContractABI = require("../deployed-smart-contract/UserRegistration.json");
//-------------------
const reliefRequestContractAddress =
  "0xbb078865aa16A6efa8F9D823019b5679d8b7c2ff";
const reliefRequestContractABI = require("../deployed-smart-contract/ReliefRequest.json");
//-------------------
const helperContractAddress = "0xE5c76C9a417B18f0858e3fB7D230B531f24fE2CE";
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
