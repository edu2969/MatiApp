import React, { useEffect } from 'react';
import { useCallback } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';

import Svg, { Circle } from 'react-native-svg';

const BACKGROUND_STROKE_COLOR = 'white';
const STROKE_COLOR = 'red';

const { width, height } = Dimensions.get('window');

const R = 70;
const CIRCLE_LENGTH = 2 * Math.PI * R;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress = ({ initialProgress }) => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  const onPress = useCallback(() => {
    progress.value = withTiming(initialProgress || 0.5, { duration: 2000 });
  }, []);

  onPress();

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={styles.svg}>
        <Circle
          cx={width * .35}
          cy={width * .21}
          r={70}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={20}
        />
        <AnimatedCircle
          cx={width * .35}
          cy={width * .21}
          r={70}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '70%',
    height: '22%',
    marginLeft: '15%',
    marginBottom: 4,
  },
  svg: {
    position: 'absolute',
  },
  progressText: {
    fontSize: 52,
    marginTop: '14%',
    color: 'white',
    width: 100,
    textAlign: 'center',
    fontFamily: 'DS-Digital',
  },
});

export default CircularProgress;