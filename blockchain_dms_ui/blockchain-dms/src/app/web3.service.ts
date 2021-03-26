import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { LoadEthService } from "./load-eth.service";
const userMasterContractAddress = "0x0451E8362cA0CdaB3a9Fd728d0219C23a3d7E8b9";
const userMasterContractABI = require("../deployed-smart-contract/UserMaster.json");
//-------------------
const ngoRegContractAddress = "0x56F9876682A2609165537b8697d1cf0dDf4dAbCb";
const ngoRegContractABI = require("../deployed-smart-contract/NgoRegistration.json");
//-------------------
const userRegContractAddress = "0x990f8C788B25D3e622bEEdc63A59B07738104Ea2";
const userRegContractABI = require("../deployed-smart-contract/UserRegistration.json");
//-------------------
const reliefRequestContractAddress =
  "0xca1475cC4c3eB7F915657386F50793dF8F50c4Fe";
const reliefRequestContractABI = require("../deployed-smart-contract/ReliefRequest.json");
//-------------------
let userMasterInstance = undefined;
let ngoRegInstance = undefined;
let userRegInstance = undefined;
let reliefRequestInstance = undefined;
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
}
