import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RollResult } from '../../hooks/useDiceRoll';
import { formatRollResult } from '../../lib/rollPresentation';
import { calculateRollStats } from '../../lib/rollStats';
import { useI18n } from '../../lib/i18n';

interface HistorySheetProps {
  history: RollResult[];
  isPremium: boolean;
  isVisible: boolean;
  onClear: () => void;
  onClose: () => void;
}

export function HistorySheet({
  history,
  isPremium,
  isVisible,
  onClear,
  onClose,
}: HistorySheetProps) {
  const { t } = useI18n();
  const visibleHistory = isPremium ? history : history.slice(0, 5);
  const stats = calculateRollStats(visibleHistory);

  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{t('history')}</Text>
              <Text style={styles.subtitle}>{isPremium ? t('last20') : t('last5')}</Text>
            </View>
            <Pressable accessibilityLabel={t('historyClose')} onPress={onClose}>
              <Text style={styles.close}>{t('close')}</Text>
            </Pressable>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.stat}>
              {t('count')} {stats.totalRolls}
            </Text>
            <Text style={styles.stat}>
              {t('avg')} {stats.average.toFixed(1)}
            </Text>
          </View>
          <ScrollView contentContainerStyle={styles.list}>
            {visibleHistory.map((roll) => (
              <View key={roll.id} style={styles.row}>
                <Text style={styles.result}>{formatRollResult(roll)}</Text>
                <Text style={styles.values}>{roll.dice.join(' • ')}</Text>
              </View>
            ))}
            {!visibleHistory.length && <Text style={styles.empty}>{t('noRolls')}</Text>}
          </ScrollView>
          <Pressable accessibilityLabel={t('clearHistory')} onPress={onClear} style={styles.clear}>
            <Text style={styles.clearLabel}>{t('clearHistory')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  clear: { alignItems: 'center', paddingVertical: 16 },
  clearLabel: { color: '#FF9D9D', fontSize: 13, fontWeight: '700' },
  close: { color: '#AEB8FF', fontSize: 14, fontWeight: '700' },
  empty: { color: '#858CA8', paddingVertical: 24, textAlign: 'center' },
  header: {
    alignItems: 'center',
    borderBottomColor: '#2A3150',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  list: { gap: 8, paddingVertical: 16 },
  overlay: { backgroundColor: 'rgba(4, 6, 15, 0.68)', flex: 1, justifyContent: 'flex-end' },
  result: { color: '#F7F8FF', fontSize: 14, fontWeight: '700' },
  row: {
    alignItems: 'center',
    backgroundColor: '#232A49',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  sheet: {
    backgroundColor: '#171C31',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '78%',
    paddingHorizontal: 22,
  },
  stat: { color: '#F4C95D', fontSize: 13, fontWeight: '800' },
  statsRow: { flexDirection: 'row', gap: 20, paddingTop: 16 },
  subtitle: { color: '#858CA8', fontSize: 12, marginTop: 4 },
  title: { color: '#F7F8FF', fontSize: 22, fontWeight: '800' },
  values: { color: '#AEB8FF', fontSize: 12 },
});
