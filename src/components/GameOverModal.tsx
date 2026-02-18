import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // length 6
}

interface GameOverModalProps {
  visible: boolean;
  status: 'won' | 'lost';
  answer: string;
  stats: Stats;
  onClose: () => void;
}

export function GameOverModal({
  visible,
  status,
  answer,
  stats,
  onClose,
}: GameOverModalProps) {
  const isWin = status === 'won';

  const safeStats = stats ?? {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0],
  }
  const winPercent =
    safeStats.gamesPlayed === 0
      ? 0
      : Math.round((safeStats.gamesWon / safeStats.gamesPlayed) * 100);

  const maxDist = Math.max(...safeStats.guessDistribution, 1);


  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {isWin ? '🎉 فزت!' : '😔 انتهت اللعبة'}
          </Text>

          <Text style={styles.subtitle}>الكلمة كانت</Text>
          <Text style={styles.answer}>{answer}</Text>

          {/* ====== STATS SUMMARY ====== */}
          <View style={styles.statsRow}>
            <StatBlock label="لعبت" value={safeStats.gamesPlayed} />
            <StatBlock label="نسبة الفوز" value={`${winPercent}%`} />
            <StatBlock label="السلسلة الحالية" value={safeStats.currentStreak} />
            <StatBlock label="أفضل سلسلة" value={safeStats.maxStreak} />
          </View>

          {/* ====== DISTRIBUTION ====== */}
          <View style={styles.distributionContainer}>
            {safeStats.guessDistribution.map((count, index) => {
              const widthPercent = (count / maxDist) * 100;

              return (
                <View key={index} style={styles.distRow}>
                  <Text style={styles.distLabel}>{index + 1}</Text>
                  <View style={styles.barBackground}>
                    <View
                      style={[
                        styles.barFill,
                        { width: `${widthPercent}%` },
                      ]}
                    >
                      <Text style={styles.barText}>{count}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <Pressable onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>حسناً</Text>
          </Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  answer: {
    color: 'white',
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
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
    color: 'white',
    width: 20,
  },
  barBackground: {
    flex: 1,
    backgroundColor: '#333',
    height: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: '#538d4e',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  barText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#538d4e',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
