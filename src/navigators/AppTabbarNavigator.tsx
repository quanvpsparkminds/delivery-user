import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { StaticParamList } from "@react-navigation/native";
import { AppBottomTabbar } from "components";
import React from "react";
import {
  AccountScreen,
  GroceryScreen,
  RestaurantScreen,
  SearchScreen,
  ShoppingScreen,
} from "screens";

export const AppTabbarNavigator = createBottomTabNavigator({
  screenOptions: { headerShown: false },
  tabBar: (props) => <AppBottomTabbar {...props} />,
  screens: {
    Restaurant: RestaurantScreen,
    Grocery: GroceryScreen,
    Shopping: ShoppingScreen,
    Search: SearchScreen,
    Account: AccountScreen,
  },
});

export type AppTabbarParamList = StaticParamList<typeof AppTabbarNavigator>;
