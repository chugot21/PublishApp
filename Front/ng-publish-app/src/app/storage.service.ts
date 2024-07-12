import { Injectable } from "@angular/core";
import CryptoJS from "crypto-js";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  token: string;

  constructor() {}

  public saveData(token: string, id: string, username: string) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    //localStorage.setItem(token, this.encrypt(id));
  }
  public getData(key: string): string | null {
    return localStorage.getItem(key);
    //let data = localStorage.getItem(token)|| "";
    //return this.decrypt(data);
  }
  public removeData() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
  }
  public clearData() {
    localStorage.clear();
  }
  // private encrypt(txt: string): string {
  //   return CryptoJS.AES.encrypt(txt, this.token).toString();
  // }
  // private decrypt(txtToDecrypt: string) {
  //   return CryptoJS.AES.decrypt(txtToDecrypt, this.token).toString(CryptoJS.enc.Utf8);
  // }
}
