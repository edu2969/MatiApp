import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Button,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  loginForm: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    padding: 40
  },
  row: {
    marginBottom: 10,
  },
  logo: {
    width: '50%',
    height: '25%',
    marginLeft: '25%',
  },
  brand: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  jumboTitle: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Sk-Modernist-Regular',
  },
  jumboSmall: {
    fontSize: 20,
    color: 'white',
    marginTop: 22,
    marginLeft: 6,
    fontFamily: 'Sk-Modernist-Regular',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#3E97F7',
    marginBottom: 10,
  }
});

const Login = ({ navigation }) => {
  const [onChangeText] = React.useState("Useless Text");

  const onLogin = () => {
    navigation.navigate('Panel');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../img/peakpx.jpg')} style={styles.backgroundImage}>
        <View style={styles.loginForm}>
          <Image source={require('../img/logo.png')} style={styles.logo}
            resizeMode='stretch' />
          <View style={styles.brand}>
            <Text style={styles.jumboTitle}>MathiApp</Text>
            <Text style={styles.jumboSmall}>v0.9</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder='email@dominio.cl'
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              onChangeText={onChangeText}
              placeholder='password'
            />
          </View>
          <View style={styles.row}>
            <Button
              onPress={onLogin}
              title="Entrar"
              accessibilityLabel="Entra en la aplicación"
              style={styles.loginButton}
            />
          </View>
          <View style={styles.row}>
            <Icon.Button name="facebook" backgroundColor="#3b5998">
              <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white' }}>
                Login with Facebook
              </Text>
            </Icon.Button>
          </View>
          <View style={styles.row}>
            <Icon.Button name="google" backgroundColor="white" color='#3b5998'>
              <Text style={{ fontFamily: 'Arial', fontSize: 15, color: '#3b5998' }}>
                Login with Facebook
              </Text>
            </Icon.Button>
          </View>
        </View>
      </ImageBackground >
    </View>
  );
};

export default Login;