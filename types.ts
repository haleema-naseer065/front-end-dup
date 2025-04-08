// src/types/types.ts
export type RootStackParamList = {
    Home: undefined;      // No params for Home screen
    Tutorial: undefined;  // No params for Tutorial screen
    Settings: undefined;  // No params for Settings screen
    StartSignup: undefined;
    StartLogin:undefined;
    MaizeTypes: undefined; // No params for MaizeTypes screen
    HistoryDetails: undefined;
    imageselection: undefined;
    splashscreen: undefined;
    ImageCropper: undefined;
    LandingScreenAfterSplash: undefined;
    BackgroundandLogo: undefined;
    BottomTabNavigator:undefined;
    ProcessingScreen: undefined;
    FertilizersRecommendation: undefined;
    NitrogenDetail: undefined;
    ViewResults: undefined;
    SignupVerify: { confirmation: any; phoneNumber: string };
    SignupName:{phoneNumber:string,pin:string};
    SignupPin:{phoneNumber:string};
    Results: undefined;
    ResultsScreen:undefined,
    EditProfile: undefined;
    AdminorUserScreen: undefined;
    AdminScreen: undefined;
    RegisteredUsersScreen: undefined;
    UsersActivity1:undefined;
    UsersActivity2:undefined;
    ViewHistoryActivity:undefined;
  };
  