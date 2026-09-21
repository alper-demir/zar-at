import { BlurMask, Canvas, Circle } from '@shopify/react-native-skia';
import { StyleSheet } from 'react-native';

interface DiceShadowProps {
  isRolling: boolean;
}

export function DiceShadow({ isRolling }: DiceShadowProps) {
  return (
    <Canvas style={[styles.canvas, { opacity: isRolling ? 0.16 : 0.3 }]}>
      <Circle cx={105} cy={13} r={78} color="#000000">
        <BlurMask blur={14} style="normal" />
      </Circle>
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    height: 38,
    position: 'absolute',
    width: 210,
  },
});
