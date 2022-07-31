import React, { useState } from "react";
import { ImageBackground, Text, View, TouchableHighlight, Dimensions } from "react-native";
import PagerView from 'react-native-pager-view';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CircularProgress from "../charts/CircularProgress";
const { width, height } = Dimensions.get('window');

const CANTIDAD_EJERCICIOS = 3, CANTIDAD_DIGITOS = 2;

const generadorDigito = (): number => {
  return Math.floor(Math.random() * 7) + 2;
}

const arregloDigitos = (largo: number): number[] => {
  return Array.from({ length: largo }, () => generadorDigito())
}

const EjercicioDojo = ({ navigation }) => {
  const pagerView = React.createRef<PagerView>();
  const [hoja, setHoja] = useState({
    titulo: "COMIENZA EN",
    numero: 0,
    digitos: [0, 0],
    operacion: '+',
    resultado: '',
    iniciado: new Date(),
  });
  const [stats, setStats] = useState({
    correctas: 0,
    tiempoPromedio: 0,
  });

  const digitos = arregloDigitos(CANTIDAD_DIGITOS);

  const toggleStart = () => {
    setHoja({
      titulo: 'EJERCICIO',
      numero: 1,
      digitos,
      operacion: '+',
      resultado: '',
      iniciado: new Date(),
    });
  }

  const presionaTecla = (tecla) => {
    const nuevaHoja = {
      titulo: 'EJERCICIO',
      numero: hoja.numero,
      digitos,
      operacion: '+',
      resultado: '',
      iniciado: new Date(),
    }
    if (tecla === "D") {
      nuevaHoja.resultado = hoja.resultado.substring(0, hoja.resultado.length - 1);
    } else if (tecla == "O") {
      const tiempoPromedio = 0;
      const nuevaStats = {
        correctas: stats.correctas,
        tiempoPromedio
      }
      const valor = Number(hoja.resultado);
      const ahora = new Date();
      const total = hoja.digititos.reduce((prev, current) => prev + current);
      if (total == valor) {
        nuevaStats.correctas++;
      }
      console.log("CALCULO", ahora.getTime() - hoja.iniciado.getTime(), stats.tiempoPromedio, hoja.numero);
      nuevaStats.tiempoPromedio = ((ahora.getTime() - hoja.iniciado.getTime()) + stats.tiempoPromedio) / hoja.numero;
      setStats({ ...nuevaStats });
      nuevaHoja.iniciado = ahora;
      nuevaHoja.resultado = '';
      nuevaHoja.numero++;
      if (nuevaHoja.numero == (CANTIDAD_EJERCICIOS + 1)) {
        pagerView.current?.setPage(1);
        return;
      }
      nuevaHoja.digitos = arregloDigitos();
    } else {
      nuevaHoja.resultado = (hoja.resultado ? hoja.resultado : '') + tecla;
    }
    setHoja({ ...nuevaHoja });
  }

  const keyboard = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, "D", 0, "O"].map((value, index) => {
      var estilos: any = [styles.tecla];
      if (value == "D") estilos.push(styles.roja);
      else if (value == "O") estilos.push(styles.verde);
      else estilos = styles.tecla;
      var tipoTextoTecla;
      if (value == "D") tipoTextoTecla = (<Icon name="backspace" style={[styles.txtTecla, styles.txtIcon]} />)
      else if (value == "O") tipoTextoTecla = (<Icon name="check" style={[styles.txtTecla, styles.txtIcon]} />)
      else tipoTextoTecla = (<Text style={styles.txtTecla}>{value}</Text>);
      return (
        <TouchableHighlight key={'tecla_'.concat(value)} style={estilos} onPress={() => presionaTecla(value)}>
          {tipoTextoTecla}
        </TouchableHighlight>
      );
    })
  }

  const operandos = (cantidadOperandos: number) => {
    let operandos = [];
    digitos.map((digito, indice) => {
      return (<View style={styles.marcoSimbolo}>
        <Text style={styles.txtSimbolo}>{hoja.digitos[indice]}</Text>
      </View>);
    })

  }

  const goAhead = () => {
    navigation.goBack();
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
          <View style={styles.ejercicio}>
            <View style={styles.fila}>
              <View style={styles.columna}>
                <View style={styles.marcoSimbolo}>
                  <Text style={styles.txtSimbolo}>{hoja.operacion}</Text>
                </View>
              </View>
              <View style={styles.columna}>
                {operandos(2)}
              </View>
              <View style={styles.columna}>
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
              </View>
            </View>
            <View style={styles.linea}></View>
            <View style={styles.fila}>
              <View style={styles.marcoSimbolo}>
                <Text style={styles.txtSimbolo}>=</Text>
              </View>
              <View style={styles.marcoSimbolo}>
                <View style={styles.resultado}>
                  <Text style={styles.txtResultado}>{hoja.resultado}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.teclado}>
            {keyboard()}
          </View>
        </View>
        <View style={styles.container} key="2">
          <Text style={styles.tituloGrafico}>Efectividad</Text>
          <CircularProgress inititalProgress={stats.correctas / 10}></CircularProgress>
          <View style={styles.row}>
            <View style={styles.column1}>
              <Text style={styles.tituloGrafico}>Correctas</Text>
              <Text style={styles.contador}>{stats.correctas}</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.tituloGrafico}>Tiempo promedio</Text>
              <View style={styles.row}>
                <Text style={styles.contador}>{(stats.tiempoPromedio / 1000).toFixed(1)}</Text>
                <Text style={styles.small}>secs</Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <TouchableHighlight key="btn-continuar" style={styles.iconFrame} onPress={goAhead}>
              <Icon name="sync" style={styles.iconPrice}></Icon>
            </TouchableHighlight>
          </View>
          <Text style={styles.etiqueta}>Buen intento, ¡Continúa entrenando!</Text>
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
    flexDirection: 'column',
    padding: 0,
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
    color: 'black',
    fontSize: 40,
    paddingLeft: 16,
    fontFamily: 'DS-Digital',
  },
  resultado: {
    backgroundColor: 'white',
    height: 60,
    width: 80,
    borderWidth: 2,
    borderColor: 'gray',
    paddingLeft: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  txtResultado: {
    color: 'black',
    fontSize: 40,
  },
  ejercicio: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 20,
  },
  linea: {
    backgroundColor: 'black',
    height: 3,
    width: '40%',
    borderRadius: 1,
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
  },
  tituloGrafico: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  column1: {
    width: '30%',
  },
  column2: {
    width: '70%',
    alignItems: 'center',
  },
  small: {
    fontSize: 20,
    color: 'white',
    marginTop: 60,
  },
  iconFrame: {
    width: '70%',
    height: width * 0.7,
    padding: '19%',
    backgroundColor: '#1877F2',
    borderRadius: width * 0.35,
  },
  iconPrice: {
    fontSize: width * 0.30,
    color: 'white',
    textAlign: 'center',
  },
  etiqueta: {
    color: 'white',
    width: '100%',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'OpenSans-Light',
    position: 'absolute',
    bottom: 20,
  }
}

export default EjercicioDojo;