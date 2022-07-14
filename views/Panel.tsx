import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const Panel = ({ navigation }) => {
  const onPressLearnMore = () => {
    navigation.navigate('AritmeticaDojo');
  }

  return (
    <ImageBackground source={require('../img/dojo.png')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.4 }}>
      <View style={styles.container}>
        <View style={styles.formulario}>
          <View style={styles.header}>
            <Text style={styles.title}>¿Qué entrenarás hoy?</Text>
            <Text style={styles.subtitle}>Ve por tu döjö</Text>
          </View>
          <View style={styles.item}>
            <TouchableHighlight style={[styles.touchable, styles.touchable1]}
              onPress={onPressLearnMore}>
              <View>
                <Icon name="calculator" style={styles.icons} />
                <Text style={styles.text}>Aritmética</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight style={[styles.touchable, styles.touchable2]}
              onPress={onPressLearnMore}>
              <View>
                <Icon name="square-root-alt" style={styles.icons} />
                <Text style={styles.text}>Algebra</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight style={[styles.touchable, styles.touchable3]}
              onPress={onPressLearnMore}>
              <View>
                <Icon name="infinity" style={styles.icons} />
                <Text style={styles.text}>Funciones</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <TouchableHighlight style={[styles.touchable, styles.touchable4]}
              onPress={onPressLearnMore}>
              <View>
                <Icon name="chart-pie" style={styles.icons} />
                <Text style={styles.text}>Estadística</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    width: '100%',
    marginBottom: 120,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: 'Sk-Modernist-Bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Sk-Modernist-Mono',
    color: 'black',
  },
  formulario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    alignItems: "center",
    width: '50%',
  },
  touchable: {
    justifyContent: "center",
    height: '20%',
    width: '80%',
    borderRadius: 10,
    marginBottom: 20,
  },
  touchable1: {
    backgroundColor: '#FA383E',
  },
  touchable2: {
    backgroundColor: '#1877F2',
  },
  touchable3: {
    backgroundColor: '#2ABBA7',
  },
  touchable4: {
    backgroundColor: '#F7B928',
  },
  icons: {
    color: 'white',
    fontSize: 90,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Sk-Modernist-Mono',
  },
  button: {
    height: '50%',
  }
})

export default Panel;


