import { Injectable } from "@angular/core";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { HttpTransportType } from "@microsoft/signalr";

@Injectable({
  providedIn: "root",
})
export class SignalRService {
  private hubConnection: HubConnection;

  constructor() {}

  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5000/Notify", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.log("Error while starting connection: " + err));
  };

  public addListner = () => {
    this.hubConnection.on("SendMessage", (notification: Notification) => {
      this.showNotification(notification);
    });
  };

  public subscribeToUser(userId: string | null) {
    this.hubConnection.invoke("SubscribeToUser", userId);
  }

  showNotification(notification: Notification) {
    alert(notification);
  }
}
