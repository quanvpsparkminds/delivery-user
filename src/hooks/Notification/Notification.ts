import notifee, { AndroidImportance } from "@notifee/react-native";

import { palette } from "theme";


class PushNotification {
  granted: boolean = false;
  channelId: string | undefined;

  async init() {
    this.channelId = await notifee.createChannel({
      id: "ZShip",
      name: "ZShip",
      importance: AndroidImportance.HIGH,
    });
    if (this.granted) {
    }
    return false;
  }



  async displayNotification(title: string, body: string) {
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: this.channelId,
        smallIcon: "ic_stat_notification",
        color: palette.primary500,
        pressAction: { id: "default" },
      },
    });
  }
}

export const pushNotification = new PushNotification();
