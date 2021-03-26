import { Injectable } from "@angular/core";
import Web3 from "web3";
const rpcURL = "http://localhost:8545";
@Injectable({
  providedIn: "root",
})
export class LoadEthService {
  constructor() {
    if (window["ethereum"]) {
      window["web3"] = new Web3(window["ethereum"]);
      window["ethereum"].enable();
    } else {
      console.log("[] Metamask is not injected..using new Web3 Instance");
      window["web3"] = new Web3(new Web3.providers.HttpProvider(rpcURL));
    }
  }

  async getEthAccount() {
    const account = await window["web3"].eth.getAccounts();
    return account;
  }
}
