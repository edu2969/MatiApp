import React, { useState } from "react";
import { Text, View, TouchableHighlight, Dimensions, ImageBackground } from "react-native";
import PagerView from 'react-native-pager-view';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CircularProgress from "../charts/CircularProgress";
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

const CANTIDAD_EJERCICIOS = 3, CANTIDAD_DIGITOS = 8;

const generadorDigito = (): number => {
  return Math.floor(Math.random() * 7) + 2;
}

const arregloDigitos = (largo: number): number[] => {
  console.log("Generando arreglo");
  return Array.from({ length: largo }, () => generadorDigito())
}

const EjercicioDojo = ({ navigation }) => {
  const pagerView = React.createRef<PagerView>();
  const [hoja, setHoja] = useState({
    titulo: "COMIENZA EN",
    numero: 0,
    digitos: Array.from({ length: CANTIDAD_DIGITOS }, () => 0),
    operacion: '+',
    resultado: '',
    iniciado: new Date(),
  });
  const [stats, setStats] = useState({
    correctas: 0,
    porcentage: 0,
    tiempoPromedio: 0,
  });

  const toggleStart = () => {
    setHoja({
      titulo: 'EJERCICIO',
      numero: 1,
      digitos: arregloDigitos(CANTIDAD_DIGITOS),
      operacion: '+',
      resultado: '',
      iniciado: new Date(),
    });
  }

  const presionaTecla = (tecla) => {
    const nuevaHoja = {
      titulo: 'EJERCICIO',
      numero: hoja.numero,
      digitos: hoja.digitos,
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
        tiempoPromedio,
        porcentage: 0,
      }
      const valor = Number(hoja.resultado);
      const ahora = new Date();
      const total = hoja.digitos.reduce((prev, current) => prev + current);
      if (total == valor) {
        nuevaStats.correctas++;
      }
      console.log("CALCULO", ahora.getTime() - hoja.iniciado.getTime(), stats.tiempoPromedio, hoja.numero);
      nuevaStats.tiempoPromedio = ((ahora.getTime() - hoja.iniciado.getTime()) + stats.tiempoPromedio) / hoja.numero;
      nuevaHoja.iniciado = ahora;
      nuevaHoja.resultado = '';
      nuevaHoja.numero++;
      if (nuevaHoja.numero == (CANTIDAD_EJERCICIOS + 1)) {
        pagerView.current?.setPage(1);
        nuevaStats.porcentage = nuevaStats.correctas / CANTIDAD_EJERCICIOS;
        setStats({ ...nuevaStats });
        return;
      }
      setStats({ ...nuevaStats });
      nuevaHoja.digitos = arregloDigitos(CANTIDAD_DIGITOS);
    } else {
      nuevaHoja.resultado = (hoja.resultado ? hoja.resultado : '') + tecla;
    }
    setHoja({ ...nuevaHoja });
  }

  const keyboard = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, "D", 0, "O"].map((value, index) => {
      var estilos: any = [styles.tecla];
      var tipoTextoTecla;
      if (value == "D") tipoTextoTecla = (<Icon name="backspace" style={[styles.txtTecla, styles.txtIcon]} />)
      else if (value == "O") tipoTextoTecla = (<Icon name="check" style={[styles.txtTecla, styles.txtIcon]} />)
      else tipoTextoTecla = (<Text style={styles.txtTecla}>{value}</Text>);
      const colores = value == "D" ? ['#E78786', '#E67776', '#E67776', '#D66766', '#D66766'] :
        value == "O" ? ['#586F6B', '#2A4A51', '#2A4A51', '#323837', '#323837'] :
          ['#A8B2BA', '#9EA2B3', '#9EA2B3', '#9198A4', '#9198A4'];
      return (
        <TouchableHighlight key={'tecla_'.concat(value)} style={estilos} onPress={() => presionaTecla(value)}>
          <LinearGradient colors={colores} style={styles.linearGradient} locations={[.1, .3, .7, .9, 1]}>
            {tipoTextoTecla}
          </LinearGradient>
        </TouchableHighlight>
      );
    })
  }

  const operandos = () => {
    return hoja.digitos?.map((digito) => {
      return (<View style={styles.marcoSimbolo}>
        <Text style={styles.txtSimbolo}>{digito}</Text>
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
      }}>
      <PagerView style={styles.pagerView}
        scrollEnabled={false}
        ref={pagerView}>
        <View style={styles.container} key="1">
          <View style={styles.ejercicio}>
            <View style={styles.fila}>
              <View style={styles.columna}>
                <View style={styles.marcoOperacion}>
                  <Text style={styles.txtOperacion}>{hoja.operacion}</Text>
                </View>
              </View>
              <View style={styles.columna}>
                <View style={styles.fila}>
                  <View style={styles.columna}>
                    {operandos()}
                  </View>
                </View>
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
              <View style={styles.marcoResultado}>
                <View style={styles.resultado}>
                  <Text style={styles.txtSigno}>=</Text>
                  <Text style={styles.txtResultado}>{hoja.resultado}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.teclado}>
            {keyboard()}
          </View>
        </View>
        <View style={styles.containerResultados} key="2">
          <Text style={styles.tituloGrafico}>Efectividad</Text>
          <CircularProgress initialProgress={stats.porcentage}></CircularProgress>
          <View style={styles.row}>
            <View style={styles.column1}>
              <Text style={styles.tituloGrafico}>Correctas</Text>
              <Text style={styles.contadorBlanco}>{stats.correctas}</Text>
            </View>
            <View style={styles.column2}>
              <Text style={styles.tituloGrafico}>Tiempo promedio</Text>
              <View style={styles.row}>
                <Text style={styles.contadorBlanco}>{(stats.tiempoPromedio / 1000).toFixed(1)}</Text>
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
    </ImageBackground>
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
    fontSize: 22,
    width: width * .6,
    textAlign: 'right',
    color: '#454A3F',
  },
  contador: {
    fontSize: 100,
    color: '#454A3F',
    fontFamily: 'DS-Digital',
    textAlign: 'right',
  },
  fila: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  columna: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  marcoSimbolo: {
    width: 60,
    marginHorizontal: 4,
  },
  txtSimbolo: {
    color: '#454A3F',
    fontSize: 44,
    paddingLeft: 16,
    fontFamily: 'DS-Digital',
  },
  marcoOperacion: {
    width: 60,
    paddingTop: 90,
    marginHorizontal: 4,
  },
  txtOperacion: {
    color: '#454A3F',
    fontSize: 120,
    fontFamily: 'DS-Digital',
  },
  marcoResultado: {
    width: '100%',
    marginLeft: '10%',
    textAlign: 'left',
  },
  resultado: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: '#969D8D',
    height: 80,
    width: '90%',
    borderWidth: 2,
    borderColor: 'gray',
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  txtSigno: {
    flex: 2,
    color: '#454A3F',
    fontSize: 72,
    fontFamily: 'DS-Digital',
  },
  txtResultado: {
    flex: 8,
    color: '#454A3F',
    fontSize: 72,
    fontFamily: 'DS-Digital',
    textAlign: 'right',
  },
  ejercicio: {
    backgroundColor: '#969D8D',
    height: '60%',
    width: '100%',
    paddingTop: 30,
  },
  linea: {
    backgroundColor: '#454A3F',
    height: 3,
    width: '40%',
    borderRadius: 1,
    marginLeft: '10%',
    marginBottom: 10,
  },
  teclado: {
    flexDirection: 'row',
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: 20,
    backgroundColor: '#50505A',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowBottomLeftRadius: 32,
    shadowBottomRightRadius: 32,
    shadowTopLeftRadius: 14,
    shadowTopRightRadius: 14,
    elevation: 7,
  },
  tecla: {
    width: '30%',
    height: 64,
    margin: '1%',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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
  containerResultados: {
    flexDirection: 'column',
    paddingTop: 16,
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
  },
  contadorBlanco: {
    fontSize: 100,
    color: 'white',
    fontFamily: 'DS-Digital',
    textAlign: 'right',
  },
}

export default EjercicioDojo;