import React, { useState } from 'react';
import Intro from './src/screens/Intro';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProvider from './src/Context/UserProvider';
import Dashboard from './src/screens/Dashboard';
import History from './src/screens/History';
import Details from './src/screens/Details';
import Operations from './src/screens/Operations';

const  Stack = createStackNavigator();

 const App = () => {
  const [userid, setUserid] = useState('');

  return (
    <NavigationContainer>
      <UserProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name='Intro'component={Intro}/>
          <Stack.Screen name='Login'component={Login}/>
          <Stack.Screen name='Register'component={Register}/>
          <Stack.Screen name='Dashboard'component={Dashboard}/>
          <Stack.Screen name='Details'component={Details}/>
          <Stack.Screen name='History'component={History}/>
          <Stack.Screen name='Operations'component={Operations}/>
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
    
  );
}

export default App;