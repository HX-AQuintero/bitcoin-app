import React, { useState, useEffect, useContext} from 'react';
import {Button, Text, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { styles } from '../theme/Operations';
import axios from 'axios';
import { UserContext } from '../Context/UserProvider';
import { TextInput } from 'react-native-gesture-handler';

const Operations = ({navigation}: any) => {
  const { userid } = useContext(UserContext);

  const [typeoper, setTypeoper] = useState("buy");
  const [current, setCurrent] = useState("usd");
  const [toggle, setToggle] = useState(true);
  const [amount, setAmount] = useState("");
  const [equival, setEquival] = useState(0);
  const [account, setAccount] = useState({
    btc: 0,
    usd: 0
  })
  
  const accounts = async () => {
    let money = {id: userid}
    let moneyInfo = await axios.post('http://localhost:3000/show', money)
    let totalMoney = moneyInfo.data;
    setAccount({
      btc: totalMoney.btc,
      usd: totalMoney.usd
    })
  };

  useEffect(() => {
    accounts();
  }, [])

  useEffect(() => {
    data;
  }, [amount])
  
  const data = async() => {
    let info = await axios.get('http://localhost:3000/info');
    let infoBitcoin = info.data.data;

    if(current === "usd" && amount !== ""){
      let value = parseFloat(amount) / parseFloat(infoBitcoin);
      return setEquival(value)
    }

    if(current === "btc" && amount !== ""){
      let value = parseFloat(amount) * parseFloat(infoBitcoin);
      return setEquival(value)
    }
  };

  const exchange = async () => {
    var allMoney = amount;
    let current_received = '';

    if(typeoper === "buy"){
      setToggle(!toggle);
      if(current === "btc"){
        current_received = "usd"
      }
      if(current === "usd"){
        current_received = "btc"
      }
      
      const infoOperation = {type_operation: "buy", user_id: userid, current_sent: current_received,
        current_received: current, quantity_sent: parseFloat(equival.toString()), quantity_received: parseFloat(allMoney)};
  
      let shop = await axios.post('http://localhost:3000/buy', infoOperation);
      if(shop.data.message == "Successful purchase!"){
        setAmount("");
        setEquival(0);
        alert("Successful purchase!");
        return navigation.navigate('History')
      }
      else {
        setEquival(0);
        return alert("Not enough money. Try another value")
      }
    };

    if(typeoper === "sell"){
      setToggle(!toggle);
      if(current === "btc"){
        current_received = "usd"
      }
      if(current === "usd"){
        current_received = "btc"
      }

      let infOperation = {type_operation: "sell", user_id: userid, current_sent: current,
        current_received: current_received, quantity_sent: parseFloat(allMoney), quantity_received: parseFloat(equival.toString())};
  
      let sold = await axios.post('http://localhost:3000/sell', infOperation);
      if(sold.data.message == "Successful purchase!"){
        setAmount("");
        setEquival(0);
        alert("Successful sale!");
        return navigation.navigate('History')
      }
      else {
        setEquival(0);
        return alert("Not enough money. Try another value")
      }
    }
  }
  
  return (
    <View style={styles.fondo}>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonatras} onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.textobotonatras}>Back</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bloque}>
        <Text style={styles.texto}>
          ACCOUNT INFO
        </Text>
        {account.btc > 0 ? (
        <Text style={styles.texto2}>
          {account.btc} BTC
        </Text>
        ): (
        <Text style={styles.texto2}>
          0 BTC
        </Text>
        )}
        {account.usd > 0 ? (
        <Text style={styles.texto2}>
          {account.usd} USD
        </Text>
        ): (
        <Text style={styles.texto2}>
          0 USD
        </Text>
        )}
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity style={styles.bloque1}>
          <Text style={styles.texto}>
            OPERATION TYPE
          </Text>
            <Picker style={{color: "white", backgroundColor: "#03312E"}}
              selectedValue={typeoper}
              onValueChange={(value: any) => setTypeoper(value)}>
                <Picker.Item label='BUY' value="buy"/>
                <Picker.Item label='SELL' value="sell"/>
            </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bloque1}>
          <Text style={styles.texto}>
            CURRENT BUY / SELL
          </Text>
            <Picker style={{color: "white", backgroundColor: "#03312E"}}
                selectedValue={current}
                onValueChange={(value: any) => setCurrent(value)}>
                  <Picker.Item label='USD' value="usd"/>
                  <Picker.Item label='BTC' value="btc"/>
              </Picker>
        </TouchableOpacity>
      </View>
        <TouchableOpacity style={styles.bloque}>
          <Text style={styles.texto}>
            QUANTITY TO {typeoper.toUpperCase()}
          </Text>
          {current === "usd" ? (
            <TextInput
              placeholder="0.000,00"
              placeholderTextColor="#037171"
              style={{textAlign: 'center', height: 37, backgroundColor: 'white'}}
              onChangeText={setAmount}
              value={amount} 
            />
          ) : (
            <TextInput
              placeholder="0.000,00000000"
              placeholderTextColor="#037171"
              style={{textAlign: 'center', height: 37, backgroundColor: 'white'}}
              onChangeText={setAmount}
              value={amount} 
            />
          )}
          <Button color='#03312E' onPress={data} title='ENTER'/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bloque}>
          {typeoper === 'sell' ? (
            <Text style={styles.texto}>
              YOU WILL GET
            </Text>  
          ) : (
            <Text style={styles.texto}>
              IT WILL COST
          </Text>
          )}
          {equival > 0 ? (
            current === 'usd' ? (
            <Text style={styles.texto}>
              {equival} BTC
            </Text>
            ) : (
            <Text style={styles.texto}>
              {equival} USD
            </Text>
            )
              ) : (
              <Text style={styles.texto}>
                  0
              </Text>
            )}
        </TouchableOpacity>
        {equival > 0 && (account.usd !== 0 || account.btc !== 0) ? (
          <Button color='#037171' onPress={exchange} title={typeoper} />
        ) : (
          <Button color='#037171' disabled={true} title={typeoper} onPress={exchange}/>
        )}
    </View>
  );
}
export default Operations;