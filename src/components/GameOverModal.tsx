import { Modal, View, Text, StyleSheet, Pressable, Share } from 'react-native';
import type { TileResult, TileState } from '../game/types';
import { COLORS } from '../utils/colors';

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  lastCompletedDayId?: string | null;
  lastWinDayId?: string | null;
}

interface GameOverModalProps {
  visible: boolean;
  status: 'won' | 'lost';
  answer: string;
  stats: Stats;
  results: TileResult[][];
  onClose: () => void;
}

export function GameOverModal({
  visible,
  status,
  answer,
  stats,
  results,
  onClose,
}: GameOverModalProps) {
  const isWin = status === 'won';

  const safeStats = stats ?? {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
  };
  const winPercent =
    safeStats.gamesPlayed === 0
      ? 0
      : Math.round((safeStats.gamesWon / safeStats.gamesPlayed) * 100);

  const maxDist = Math.max(...safeStats.guessDistribution, 1);

  function stateToEmoji(state: TileState) {
    if (state === 'correct') return '🟩';
    if (state === 'present') return '🟨';
    if (state === 'absent') return '🟥';
    return '⬛';
  }

  function buildShareText() {
    const guessesUsed = results?.length ?? 0;
    const score = isWin ? `${guessesUsed}/6` : 'X/6';

    const grid = (results ?? [])
      .map(row =>
        [...row]
          .reverse()
          .map(tile => stateToEmoji(tile.state))
          .join('')
      )
      .join('\n');

    const day = safeStats.lastCompletedDayId ? ` ${safeStats.lastCompletedDayId}` : '';

    return `Kalima${day} ${score}\n\n${grid}`;
  }

  async function onShare() {
    try {
      const message = buildShareText();
      await Share.share({ message });
    } catch (e) {
      console.log('Share failed:', e);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {isWin ? '🎉 فزت!' : '😔 انتهت اللعبة'}
          </Text>

          <Text style={styles.subtitle}>الكلمة كانت</Text>
          <Text style={styles.answer}>{answer}</Text>

          {/* STATS SUMMARY */}
          <View style={styles.statsRow}>
            <StatBlock label="لعبت" value={safeStats.gamesPlayed} />
            <StatBlock label="نسبة الفوز" value={`${winPercent}%`} />
            <StatBlock label="السلسلة الحالية" value={safeStats.currentStreak} />
            <StatBlock label="أفضل سلسلة" value={safeStats.maxStreak} />
          </View>

          {/* DISTRIBUTION */}
          <View style={styles.distributionContainer}>
            {safeStats.guessDistribution.map((count, index) => {
              const widthPercent = (count / maxDist) * 100;
              return (
                <View key={index} style={styles.distRow}>
                  <Text style={styles.distLabel}>{index + 1}</Text>
                  <View style={styles.barBackground}>
                    {count > 0 && (
                    <View style={[styles.barFill, { width: `${widthPercent}%` }]}>
                      <Text style={styles.barText}>{count}</Text>
                    </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <Pressable onPress={onShare} style={styles.shareButton}>
              <Text style={styles.shareButtonText}>مشاركة</Text>
            </Pressable>

            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>حسناً</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function StatBlock({ label, value }: { label: string; value: any }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(20, 18, 17, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: COLORS.charcoal,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    color: COLORS.lightGrey,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: COLORS.lightGrey,
    fontSize: 14,
    marginBottom: 4,
  },
  answer: {
    color: COLORS.lightGrey,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 2,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: COLORS.lightGrey,
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: COLORS.lightGrey,
    fontSize: 11,
    textAlign: 'center',
  },

  distributionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  distLabel: {
    color: COLORS.lightGrey,
    width: 20,
  },
  barBackground: {
    flex: 1,
    backgroundColor: 'rgba(218, 220, 224, 0.03)',
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: COLORS.lightGrey,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  barText: {
    color: COLORS.charcoal,
    fontSize: 12,
    fontWeight: 'bold',
  },

  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  shareButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: COLORS.grid,
  },
  shareButtonText: {
    color: COLORS.lightGrey,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
  },
  closeButtonText: {
    color: COLORS.charcoal,
    fontSize: 16,
    fontWeight: 'bold',
  },
});