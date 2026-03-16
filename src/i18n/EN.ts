import { ERestaurantType } from "screens/RestaurantScreen/RestaurantScreen.types";
import { ESignInType } from "screens/SignInScreen/SignInScreen.types";

export const en = {
  common: {
    hi: "Hi",
    save: "Save",
    continue: "Continue",
    signIn: "Sign In",
    signOut: "Sign Out",
    ok: "OK",
    cancel: "Cancel",
    openSettings: "Open settings",
    today: "Today",
    yesterday: "Yesterday",
    add: "Add",
    checkout: "Checkout",
  },
  screen: {
    signIn: "Sign In",
  },
  biometric: {
    FaceID: {
      title: "Secure Your Account\nwith Face ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Face ID",
    },
    TouchID: {
      title: "Secure Your Account\nwith Touch ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Touch ID",
    },
    Biometrics: {
      title: "Secure Your Account\nwith Fingerprint Authentication",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Fingerprint",
    },
    promtMessage: "Confirm your fingerprint",
    cancelButtonText: "Cancel",
  },
  input: {
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
    phone: { label: "Phone number", placeholder: "Enter your phone number" },
    firstName: { label: "First name", placeholder: "Enter your first name" },
    lastName: { label: "Last name", placeholder: "Enter your last name" },
    fullName: {
      label: "Full name",
      placeholder: "Enter your full name",
    },
  },
  errorMessage: {
    input: {
      compare: "{{input}} must match",
      required: "Please, make sure you fill in {{input}}.",
      incorrect: "Please, make sure you fill correct information.",
      invalid: "Invalid {{input}}.",
      mesExtensionOne: "Please upload only pdf, png, jpg, jpeg format",
      bankAccountNumber: "The account number must be between 10 and 15 digits.",
      email: "Please enter a valid email address",
      dob: "You must be at least 18 years old to use this app.",
      password: {
        uppercase: "Password must contain at least one uppercase letter.",
        lowercase: "Password must contain at least one lowercase letter.",
        number: "Password must contain at least one number.",
        mismatch: "Passwords do not match.",
      },
      incorrectEmail: "Please enter a valid email address",
      maxImage: "Please upload a file smaller than or equal to 5MB",
    },
    minLength: "The length must be larger than or equal to {{length}}",
    maxLength: "The length must be less than or equal to {{length}}",
  },
  appTab: {
    [ERestaurantType.DELIVERY]: "Delivery",
    [ERestaurantType.PICK_UP]: "Pick up",
    [ERestaurantType.DINE_IN]: "Dine in",
  },
  tabs: {
    restaurant: "Restaurant",
    grocery: "Grocery",
    shopping: "Shopping",
    search: "Search",
    account: "Account",
  },
  signIn: {
    title: {
      [ESignInType.SIGN_IN]: "Login",
      [ESignInType.SIGN_UP]: "Register",
    },
    sub: `Create an account or log in to explore\nabout our app`,
    tabs: {
      [ESignInType.SIGN_IN]: "Log In",
      [ESignInType.SIGN_UP]: "Sign Up",
    },
    loginWith: "Or login with",
    forgot: "Forgot Password?",
  },
  home: {
    search: "Food, groceries, drinks, etc.",
    topRate: "Top Rated Restaurant",
    rating: "{{rate}} Ratings",
    menu: {
      seller: "Best Seller",
      promo: "Promo",
      meal: "Combo",
      nearby: "Nearby",
    },
  },
  shopping: {
    near: "Stores Near You",
  },
  store: {
    delivery: "Delivery",
    arrive: "Arrive {{minutes}}min ({{about}} mi)",
  },
};

export type TTranslations = typeof en;
