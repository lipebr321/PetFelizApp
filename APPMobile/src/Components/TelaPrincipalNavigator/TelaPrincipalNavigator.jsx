import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuUsuario from "../MenuUsuario/MenuUsuario";
import PerfilUsuario from "../../Pages/PerfilUsuario/PerfilUsuario";
import TelaPrincipal from "../../Pages/TelaPrincipal/TelaPrincipal";
import SobreNos from "../../Pages/SobreNos/SobreNos";
import TelaConfig from "../../Pages/TelaConfig/TelaConfig";
import CadastroAnimal from "../../Pages/CadastroAnimal/CadastroAnimal";
import FAQ from "../../Pages/FAQ/FAQ";
import PetsUsuario from "../../Pages/PetsUsuario/PetsUsuario";
import TelaPet from "../../Pages/TelaPet/TelaPet";
import AlterarPet from "../../Pages/AlterarPet/AlterarPet";
import { AuthContextFunctions } from "../../../AuthContext";

const Drawer = createDrawerNavigator();

const TelaPrincipalNavigator = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const usuarioLogado = await AuthContextFunctions.CheckUserLogin();
      setUser(usuarioLogado ? await AuthContextFunctions.GetUserData() : null);
    };

    fetchUser();
  }, []);

  return (
    <Drawer.Navigator
    initialRouteName="TelaPrincipal"
    drawerContent={(props) => <MenuUsuario {...props} user={user} />}
    screenOptions={({}) => ({
      headerStyle: {
        backgroundColor: "#F9C200",
      },
    })}
  >
    <Drawer.Screen
      name="TelaPrincipal"
      component={TelaPrincipal}
      options={{ title: "PetFeliz" }}
    />

      <Drawer.Screen
        name="PerfilUsuario"
        component={PerfilUsuario}
        options={{ title: "PetFeliz" }}
      />

      <Drawer.Screen
        name="SobreNos"
        component={SobreNos}
        options={{ title: "PetFeliz" }}
      />

      <Drawer.Screen
        name="TelaConfig"
        component={TelaConfig}
        options={{ title: "PetFeliz" }}
      />

      <Drawer.Screen
        name="CadastroAnimal"
        component={CadastroAnimal}
        options={{ title: "PetFeliz" }}
      />

      <Drawer.Screen name="FAQ" component={FAQ} options={{ title: null }} />

      <Drawer.Screen
        name="PetsUsuario"
        component={PetsUsuario}
        options={{ title: "PetFeliz" }}
      />

      <Drawer.Screen
        name="TelaPet"
        component={TelaPet}
        options={{ title: "PetFeliz" }}
      />
      <Drawer.Screen
            name="AlterarPet"
            component={AlterarPet}
            options={{ title: "PetFeliz" }}
          />

    </Drawer.Navigator>

    
  );
};

export default TelaPrincipalNavigator;
