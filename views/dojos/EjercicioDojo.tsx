import React, { useState } from "react";
import { ImageBackground, Text, View, TouchableHighlight } from "react-native";
import PagerView from 'react-native-pager-view';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome5';

const generadorDigito = () => {
  return Math.floor(Math.random() * 9);
}

const EjercicioDojo = ({ navigation }) => {
  const pagerView = React.createRef<PagerView>();
  const [contador, setContador] = useState(3);
  const [hoja, setHoja] = useState({
    titulo: "COMIENZA EN",
    numero: false,
    digito1: '?',
    digito2: '?',
    operacion: '+',
    resultado: ' ',
  })

  const toggleStart = () => {
    setHoja({
      titulo: 'EJERCICIO',
      numero: 1,
      digito1: generadorDigito(),
      digito2: generadorDigito(),
      operacion: '+',
      iniciado: new Date(),
    });
  }

  const presionaTecla = (tecla) => {
    console.log("TECLA", tecla);
  }

  return (
    <ImageBackground source={require('../../img/dojo.png')}
      style={styles.backgroundImage}
      imageStyle={{
        resizeMode: "cover",
        alignSelf: "flex-end",
        opacity: 0.4,
      }} >
      <PagerView style={styles.pagerView}
        scrollEnabled={false}
        ref={pagerView}>
        <View style={styles.container} key="1">
          <Text style={styles.titulo}>{hoja.titulo}</Text>
          {hoja.numero ?
            <Text style={styles.contador}>{hoja.numero}</Text>
            :
            <CountDown
              until={3}
              onFinish={toggleStart}
              timeLabels={false}
              timeToShow={['S']}
              digitStyle={{
                backgroundColor: 'transparent',
                height: 120,
              }}
              digitTxtStyle={{
                fontWeight: 'normal',
                fontFamily: 'DS-Digital',
                padding: 0,
                top: -20,
              }}
              size={100}
            />}
          <View style={styles.ejercicio}>
            <View style={styles.fila}>
              <View style={styles.columna}>
                <View style={styles.marcoSimbolo}>
                  <Text style={styles.txtSimbolo}>{hoja.operacion}</Text>
                </View>
              </View>
              <View style={styles.columna}>
                <View style={styles.marcoSimbolo}>
                  <Text style={styles.txtSimbolo}>{hoja.digito1}</Text>
                </View>
                <View style={styles.marcoSimbolo}>
                  <Text style={styles.txtSimbolo}>{hoja.digito2}</Text>
                </View>
              </View>
            </View>
            <View style={styles.linea}></View>
            <View style={styles.fila}>
              <View style={styles.marcoSimbolo}>
                <Text style={styles.txtSimbolo}>=</Text>
              </View>
              <View style={styles.marcoSimbolo}>
                <View style={styles.resultado}>
                  <Text style={styles.txtResultado}>99</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.teclado}>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(1)}>
              <Text style={styles.txtTecla}>1</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(2)}>
              <Text style={styles.txtTecla}>2</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(3)}>
              <Text style={styles.txtTecla}>3</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(4)}>
              <Text style={styles.txtTecla}>4</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(5)}>
              <Text style={styles.txtTecla}>5</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(6)}>
              <Text style={styles.txtTecla}>6</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(7)}>
              <Text style={styles.txtTecla}>7</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(8)}>
              <Text style={styles.txtTecla}>8</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(9)}>
              <Text style={styles.txtTecla}>9</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.tecla, styles.roja]} onPress={() => presionaTecla("D")}>
              <Icon name="backspace" style={[styles.txtTecla, styles.txtIcon]} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.tecla} onPress={() => presionaTecla(0)}>
              <Text style={styles.txtTecla}>0</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.tecla, styles.verde]} onPress={() => presionaTecla("O")}>
              <Icon name="check" style={[styles.txtTecla, styles.txtIcon]} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.container} key="2">
          <Text style={styles.text}>Chao</Text>
        </View>
      </PagerView>
    </ImageBackground >
  )
}

const styles = {
  backgroundImage: {
    resizeMode: 'cover',
    backgroundColor: '#FA383E',
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  icons: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  pagerView: {
    flex: 1,
  },
  titulo: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  contador: {
    fontSize: 100,
    color: 'white',
    fontFamily: 'DS-Digital',
    textAlign: 'center',
    marginBottom: 21,
  },
  fila: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  columna: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  marcoSimbolo: {
    width: 60,
    height: 60,
    marginHorizontal: 4,
  },
  txtSimbolo: {
    color: 'white',
    fontSize: 40,
    paddingLeft: 16,
  },
  resultado: {
    backgroundColor: 'white',
    height: 60,
    width: 80,
    borderWidth: 2,
    borderColor: 'gray',
    paddingLeft: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  txtResultado: {
    color: 'black',
    fontSize: 40,
  },
  ejercicio: {
    backgroundColor: '#cccccc55',
    paddingVertical: 20,
    borderRadius: 8,
  },
  linea: {
    backgroundColor: 'white',
    height: 6,
    width: '40%',
    borderRadius: 3,
    marginLeft: '30%',
    marginBottom: 10,
  },
  teclado: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: '15%',
    marginTop: 48,
  },
  tecla: {
    width: 64,
    height: 64,
    backgroundColor: 'lightseagreen',
    borderRadius: 6,
    margin: 4,
  },
  roja: {
    backgroundColor: 'red',
  },
  verde: {
    backgroundColor: 'limegreen',
  },
  txtTecla: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    paddingTop: 9,
    fontWeight: 'bold',
  },
  txtIcon: {
    paddingTop: 14,
  }
}

export default EjercicioDojo;