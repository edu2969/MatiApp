import React, { useState } from "react";
import { ImageBackground, Text, View, TouchableHighlight, Dimensions, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { curveBasis, line, scaleLinear, scaleTime } from 'd3';
import { parse, Path as RePath } from 'react-native-redash';
import Animated from 'react-native-reanimated';
import {
  animatedData,
  animatedData2,
  animatedData3,
  DataPoint,
  originalData,
} from '../charts/Data';
import LineChart from '../charts/LineChart';
import PagerView from 'react-native-pager-view';
import Svg from "react-native-svg";
const { width, height } = Dimensions.get('screen');
const CARD_WIDTH = width - 20;
const GRAPH_WIDTH = CARD_WIDTH - 60;
const CARD_HEIGHT = 325;
const GRAPH_HEIGHT = 200;

export type GraphData = {
  max: number;
  min: number;
  curve: RePath;
  mostRecent: number;
};

const makeGraph = (data: DataPoint[]) => {
  const max = Math.max(...data.map(val => val.value));
  const min = Math.min(...data.map(val => val.value));
  const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

  const x = scaleTime()
    .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
    .range([10, GRAPH_WIDTH - 10]);

  const curvedLine = line<DataPoint>()
    .x(d => x(new Date(d.date)))
    .y(d => y(d.value))
    .curve(curveBasis)(data);

  return {
    max,
    min,
    curve: parse(curvedLine!),
    mostRecent: data[data.length - 1].value,
  };
};

const graphData: GraphData[] = [
  makeGraph(originalData),
  makeGraph(animatedData),
  makeGraph(animatedData2),
  makeGraph(animatedData3),
];

const AritmeticaDojo = ({ navigation }) => {
  const [trainingState, setTrainingState] = useState({
    suma: true,
    nivel: '01',
  })
  const viewPager = React.createRef<ViewPager>();

  const setResume = () => {
    viewPager.current?.setPage(0);
  }

  const setTraining = () => {
    viewPager.current?.setPage(1);
  }

  const toggleSumatoria = () => {
    setTrainingState({
      suma: true,
      nivel: '01',
    })
  }

  const toggleResta = () => {
    setTrainingState({
      resta: true,
      nivel: '01',
    })
  }

  const toggleMultiplicacion = () => {
    setTrainingState({
      multiplicacion: true,
      nivel: '01',
    })
  }

  const toggleDivision = () => {
    setTrainingState({
      division: true,
      nivel: '01',
    })
  }

  const iniciarEjercicio = () => {
    console.log("TIPO", trainingState);
    navigation.navigate('EjercicioDojo');
  }

  return (
    <ImageBackground source={require('../../img/dojo.png')}
      style={styles.backgroundImage}
      imageStyle={{
        resizeMode: "cover",
        alignSelf: "flex-end",
        opacity: 0.4,
      }} >
      <View style={styles.container}>
        <View style={styles.content}>
          <PagerView style={styles.pagerView} initialPage={0} ref={viewPager}>
            <View key="1">
              <Animated.View style={styles.graphCard}>
                <LineChart
                  height={GRAPH_HEIGHT}
                  width={GRAPH_WIDTH}
                  data={graphData}
                  bottomPadding={20}
                  leftPadding={0}
                />
              </Animated.View>
            </View>
            <View key="2">
              <Text style={styles.titulo}>Nivel</Text>
              <Text style={styles.nivel}>{trainingState.nivel}</Text>
              <View style={styles.botonera}>
                <TouchableHighlight style={[styles.boton, styles.botonActivo]}
                  onPress={toggleSumatoria}>
                  <View>
                    <Text style={[styles.boton.texto, styles.botonActivo.texto]}>+</Text>
                  </View>
                </TouchableHighlight>
                <Icon name="angle-double-right" style={styles.separador} />
                <TouchableHighlight style={styles.boton}
                  onPress={toggleResta}>
                  <View>
                    <Text style={styles.boton.texto}>-</Text>
                  </View>
                </TouchableHighlight>
                <Icon name="angle-double-right" style={styles.separador} />
                <TouchableHighlight style={styles.boton}
                  onPress={toggleMultiplicacion}>
                  <View>
                    <Text style={styles.boton.texto}>×</Text>
                  </View>
                </TouchableHighlight>
                <Icon name="angle-double-right" style={styles.separador} />
                <TouchableHighlight style={styles.boton}
                  onPress={toggleDivision}>
                  <View>
                    <Text style={styles.boton.texto}>÷</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.tip}>
                <Text style={styles.tip.texto}>Realiza las sumatorias correctamente y en el menor
                  tiempo posible.</Text>
              </View>
              <TouchableHighlight style={styles.circularButton}
                onPress={iniciarEjercicio}>
                <View>
                  <Text style={styles.circularButton.texto}>INICIAR</Text>
                </View>
              </TouchableHighlight>
            </View>
          </PagerView>
        </View>
        <View style={styles.footerMenu}>
          <TouchableHighlight style={styles.opcionMenu}
            onPress={setResume}>
            <View>
              <Icon name="street-view" style={styles.icons} />
              <Text style={styles.text}>Resúmen</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.opcionMenu}
            onPress={setTraining}>
            <View>
              <Icon name="brain" style={styles.icons} />
              <Text style={styles.text}>Práctica</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View >
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
  content: {
    flex: 9,
  },
  footerMenu: {
    flex: 1,
    backgroundColor: '#FFFFFF22',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  opcionMenu: {
    paddingTop: 12,
    flex: 1,
  },
  icons: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Sk-Modernist-Mono',
    textAlign: 'center',
  },
  graphCard: {
    elevation: 5,
    borderRadius: 20,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFFBB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pagerView: {
    flex: 1,
  },
  titulo: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'DS-Digital',
    textAlign: 'center',
  },
  nivel: {
    fontSize: 90,
    color: 'white',
    fontFamily: 'DS-Digital',
    textAlign: 'center',
  },
  botonera: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boton: {
    width: 48,
    height: 48,
    backgroundColor: '#CCCCCC55',
    borderRadius: 6,
    margin: 4,
    texto: {
      fontSize: 32,
      color: 'red',
      textAlign: 'center',
    }
  },
  separador: {
    color: '#FFFFFF55',
    fontSize: 30,
    textAlign: 'center',
    margin: 9,
  },
  botonActivo: {
    backgroundColor: 'white',
    texto: {
      color: 'skyblue',
    },
  },
  tip: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: '10%',
    padding: 20,
    texto: {
      fontSize: 26,
      color: '#5b5b5b',
      fontFamily: 'Optima-Regular',
    },
  },
  circularButton: {
    width: width * .75,
    height: width * .75,
    marginLeft: width * .125,
    backgroundColor: 'orangered',
    borderRadius: width * .75,
    texto: {
      textAlign: 'center',
      marginTop: width / 3 - 10,
      fontSize: 40,
      color: 'white',
    }
  }
}

export default AritmeticaDojo;