import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, style, variant = 'primary', ...props }: ButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.label, variant === 'secondary' && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#F4C95D',
    borderRadius: 16,
    paddingHorizontal: 28,
    paddingVertical: 17,
    shadowColor: '#F4C95D',
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
  },
  secondary: {
    backgroundColor: '#252B46',
  },
  label: {
    color: '#241F13',
    fontSize: 17,
    fontWeight: '800',
  },
  secondaryLabel: {
    color: '#F7F8FF',
    fontSize: 15,
  },
  pressed: {
    opacity: 0.75,
  },
});
