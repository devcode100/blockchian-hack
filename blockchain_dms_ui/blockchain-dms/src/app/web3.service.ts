import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { LoadEthService } from "./load-eth.service";
const userMasterContractAddress = "0x91EF649f4FDF3d676B8B26d17DBffCe5AA20adE1";
const userMasterContractABI = require("../deployed-smart-contract/UserMaster.json");
//-------------------
const ngoRegContractAddress = "0xb6E47f653e8071E5810b9aD502c09ff72E67EEC0";
const ngoRegContractABI = require("../deployed-smart-contract/NgoRegistration.json");
//-------------------
const userRegContractAddress = "0x7480C5F73265539b9bF441DEc42c4589AE9BB6Ed";
const userRegContractABI = require("../deployed-smart-contract/UserRegistration.json");
//-------------------
const reliefRequestContractAddress =
  "0x31a4DF768E72b16b6d46581a8563f7Cba7f92c2e";
const reliefRequestContractABI = require("../deployed-smart-contract/ReliefRequest.json");
//-------------------
const helperContractAddress = "0x40644ac444F9c309A21D11B25b0984903BE233e3";
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
