import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaDeLogin from "./src/Pages/TelaDeLogin/TelaDeLogin";
import TelaDeCadastro from "./src/Pages/TelaDeCadastro/TelaDeCadastro";
import TelaPrincipalNavigator from "./src/Components/TelaPrincipalNavigator/TelaPrincipalNavigator";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaDeLogin" component={TelaDeLogin} />
        <Stack.Screen name="TelaDeCadastro" component={TelaDeCadastro} />
        <Stack.Screen
          name="TelaPrincipalNavigator"
          component={TelaPrincipalNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
