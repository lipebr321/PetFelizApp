import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

async function SaveJWT(jwtData) {
  const userData = jwtDecode(jwtData);
  try {
    await AsyncStorage.setItem("jwt", jwtData);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving data to AsyncStorage:", error);
  }
}

async function GetUserData() {
  try {
    const userDataString = await AsyncStorage.getItem("userData");
    if (userDataString !== null) {
      console.log(userDataString);
      return userDataString;
    }
    return null;
  } catch (error) {
    console.error("Error getting data from AsyncStorage:", error);
    return null;
  }
}

async function GenerateHeader() {
  const usuarioLogado = await CheckUserLogin();

  if (usuarioLogado == false) {
    Navegar("TelaDeLogin");
  }

  try {
    const token = await AsyncStorage.getItem("jwt");
    return {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
  } catch (error) {
    console.error("Erro noAsyncStorage:", error);
    return {};
  }
}

async function CheckUserLogin() {
  try {
    const token = await AsyncStorage.getItem("jwt");

    if (!token) {
      return false;
    }

    const userDataString = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const actualDate = Date.parse(new Date()) / 1000;

    if (actualDate > userData.exp) { 
      await AsyncStorage.removeItem("jwt");
      await AsyncStorage.removeItem("userData");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking login in AsyncStorage:", error);
    return false;
  }
}


const fazerLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem("jwt");

    navigation.navigate("TelaDeLogin");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

async function GetAndUserData() {
  try {
    const userDataString = await AsyncStorage.getItem("userData");
    console.log(userDataString);
    return JSON.parse(userDataString);
  } catch (error) {
    console.error("Error getting data from AsyncStorage:", error);
    return null;
  }
}


export const AuthContextFunctions = {
  SaveJWT,
  GetUserData,
  GenerateHeader,
  CheckUserLogin,
  fazerLogout,
  GetAndUserData,
};
