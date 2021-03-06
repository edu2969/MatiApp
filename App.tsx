import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Panel from './views/Panel';
import Login from './views/Login';
import AritmeticaDojo from './views/dojos/AritmeticaDojo';
import EjercicioDojo from './views/dojos/EjercicioDojo';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor='#00000000'
        barStyle='default'
        showHideTransition='fade'
        translucent={true} />
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Panel"
          component={Panel}
        />
        <Stack.Screen
          name="AritmeticaDojo"
          component={AritmeticaDojo}
        />
        <Stack.Screen
          name="EjercicioDojo"
          component={EjercicioDojo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;