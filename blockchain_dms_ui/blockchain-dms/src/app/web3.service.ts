import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { LoadEthService } from "./load-eth.service";
const userMasterContractAddress = "0x00638E5DA335A78A46B4818e0352a0ED60D75381";
const userMasterContractABI = require("../deployed-smart-contract/UserMaster.json");
//-------------------
const ngoRegContractAddress = "0x5128C7188Ca4936BB09D881567d1EBE5EcbCA798";
const ngoRegContractABI = require("../deployed-smart-contract/NgoRegistration.json");
//-------------------
const userRegContractAddress = "0x550A9D621F0e9d5E15bAA14ACcbb1603f79450dd";
const userRegContractABI = require("../deployed-smart-contract/UserRegistration.json");
//-------------------
let userMasterInstance = undefined;
let ngoRegInstance = undefined;
let userRegInstance = undefined;
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
}
