import { SignUp } from "./modal/SignUp";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SignIn } from "./modal/SignIn";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { UserInfo } from "./modal/userInfo";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isNGORegistered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  isUserRolerRegistered: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  userInfo: UserInfo;

  signIn(loginDetails: SignIn) {
    return this.httpClient.post(
      "http://localhost:8080/api/auth/signin",
      loginDetails
    );
  }

  signUp(singUpDetails: SignUp) {
    return this.httpClient.post(
      "http://localhost:8080/api/auth/signup",
      singUpDetails
    );
  }

  validateToken() {
    return this.httpClient.get("http://localhost:8080/api/validate/token", {
      headers: new HttpHeaders({ "x-access-token": this.getToken() }),
    });
  }

  getUserDetails(id: string) {
    return this.httpClient.get("http://localhost:8080/api/get/user/" + id, {
      headers: new HttpHeaders({
        "x-access-token": this.getToken(),
      }),
    });
  }

  addToken(accesToken: string) {
    localStorage.setItem("token", accesToken);
  }

  removeToken() {
    localStorage.removeItem("token");
    this.deleteUserDetails();
  }

  saveUserDetails(loginUSerInfo) {
    this.userInfo = loginUSerInfo;
  }

  deleteUserDetails() {
    this.userInfo = null;
  }

  isLoginValid() {
    if (localStorage.getItem("token") && this.userInfo) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  checkIfRoleIsNGO(response: UserInfo) {
    let isNGO = false;
    if (response.roles && response.roles.includes("ROLE_NGO")) {
      isNGO = true;
    }
    return isNGO;
  }

  checkIfRoleIsUSER(response: UserInfo) {
    let isUSER = false;
    if (response.roles && response.roles.includes("ROLE_USER")) {
      isUSER = true;
    }
    return isUSER;
  }
}
