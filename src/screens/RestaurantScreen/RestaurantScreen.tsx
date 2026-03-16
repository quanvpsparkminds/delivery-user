import { AppTab, Banner, Layout } from "components";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { ERestaurantType } from "./RestaurantScreen.types";
import * as Components from "./components";
import { useAppNavigation } from "navigators";

const tabs = Object.values(ERestaurantType);

export const RestaurantScreen = () => {
  const [type, setType] = useState<ERestaurantType>(ERestaurantType.DELIVERY);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Banner />
      <Layout paddingX="md">
        <AppTab tabs={tabs} activeTab={type} onChangeTab={setType} />
        <Components.RMenu />
        <Components.RTopRate />
      </Layout>
    </ScrollView>
  );
};
