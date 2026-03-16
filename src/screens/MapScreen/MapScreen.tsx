import { images } from "@assets/index";
import { Layout } from "components";
import { useAppSelector } from "hooks";
import { useAppNavigation } from "navigators";
import React, { useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { TLocation } from "services";
import { selectLocation } from "store/slices/LocationSlice";
import { style } from "theme";
import * as Components from "./components";
import { Keyboard, Pressable } from "react-native";

const markers = [
  {
    id: 1,
    latitude: 10.802548992606399,
    longitude: 106.64220664053428,
  },
];

export const MapScreen = () => {
  const navigation = useAppNavigation();
  const locationCurrent = useAppSelector(selectLocation);
  const [location, setLocation] = useState<TLocation>(locationCurrent);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <Layout>
      <Pressable onPress={() => Keyboard.dismiss()} style={style.flex_1}>
        <MapView
          style={style.flex_1}
          region={{
            latitude: location.lat,
            longitude: location.long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {markers.map((m) => (
            <Marker
              key={m.id}
              coordinate={{ latitude: m.latitude, longitude: m.longitude }}
              onPress={() => {}}
              image={images.location_maker}
            />
          ))}
          <Marker
            key={"current-location"}
            coordinate={{ latitude: location.lat, longitude: location.long }}
            onPress={() => {}}
          />
        </MapView>
      </Pressable>
      <Components.MHeader onChangeRegion={setLocation} />
    </Layout>
  );
};
