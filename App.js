import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard'

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGIHJKLMNOPQRSTUVWXYZ0123456789'

export default function App() {
  const [password, setPassword] = useState('')
  const [size, setSize] = useState(10)

  const generatePass = () => {
    let pass = ''

    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n))
    }
    setPassword(pass)
  }

  const copyPass = () => {
    Clipboard.setString(password)
    alert('Senha copiada com sucesso!')
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          // maximumTrackTintColor="#FF0000"
          maximumTrackTintColor="#000"
          value={size}
          onValueChange={valor => setSize(valor.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password !== '' && (
        <View style={styles.area}>
          <Text onLongPress={copyPass} style={styles.password}>
            {password}
          </Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    marginBottom: 60
  },

  title: {
    fontSize: 30,
    fontWeight: '700'
  },

  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 7
  },

  button: {
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    borderRadius: 7
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },

  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  }
})
