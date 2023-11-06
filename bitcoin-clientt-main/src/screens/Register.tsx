import React, {useState} from 'react';
import { View, Text, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from '../theme/Register';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const Register = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btc, setBtc] = useState("");
  const [usd, setUsd] = useState("");

  const handleSubmit = async () => {
    let userInfo = await axios.post('http://localhost:3000/register', {username: username, password: password, btc: btc, usd: usd})
    let infoRegister = userInfo.data.register;

    if (username !== '' && password !== '' && btc !== '' && usd !== ''){
      if (infoRegister === "username already in use. Try again"){
        return alert("Username already in use. Try again or login")
      }
      if (infoRegister === "user created successfully"){
        setUsername('');
        setPassword('');
        setBtc('');
        setUsd('');
        alert("User created successfully")
        return navigation.navigate("Login");
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
        <TextInput
          placeholder='BTC'
          placeholderTextColor="white"
          style={styles.texto}
          value={btc}
          onChangeText={setBtc}
        />

        <TextInput
          placeholder='USD'
          placeholderTextColor="white"
          style={styles.texto}
          value={usd}
          onChangeText={setUsd}
        />
      </View>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={handleSubmit}
        >
          <Text style={styles.textoboton}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonatras} onPress={() => navigation.navigate('Intro')}
        >
          <Text style={styles.textobotonatras}>Back</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}

export default Register;
