import React, {useContext, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/Login';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { UserContext } from '../Context/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userid, setUserid } = useContext(UserContext); 

  const handleSubmit = async () => {
    let userInfo = await axios.post('http://localhost:3000/login', {username: username, password: password})
    let infoLogin = userInfo.data.login;
    
    if (username !== '' && password !== ''){
      if (infoLogin === "user doesn't exist"){
        return alert("User doesn't exist. Try again or register, please")
      }
      if (infoLogin === "password is wrong. Try again"){
        return alert("Password is wrong. Try again")
      }
      if (typeof infoLogin === "number"){
        setUserid(infoLogin.toString())
        setUsername('');
        setPassword('');
        var tokenFake = "DFGERq23EFW4%$asdasd%$&dffgdfhsdtgE546e4" + infoLogin
        try {
          await AsyncStorage.setItem('token', tokenFake)
        } catch (err){
          console.log(err)
        }
        return navigation.navigate('Dashboard')
      }
    } alert("Fill in all the fields, please")
  }

  return (
    <View style={styles.fondo}>
      <View style={styles.infos}>
        <TextInput
          placeholder='username'
          placeholderTextColor="white"
          style={styles.texto}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder='password'
          secureTextEntry={true}
          placeholderTextColor="white"
          style={styles.texto}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={handleSubmit}
        >
          <Text style={styles.textoboton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonatras} onPress={() => navigation.navigate('Intro')}
        >
          <Text style={styles.textobotonatras}>Back</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}

export default Login;
