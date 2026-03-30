import React, { useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../theme/colors';

const TABS = [
  { name: 'Dashboard', iconOff: 'home-outline',     iconOn: 'home',      label: 'Home'    },
  { name: 'Stock',     iconOff: 'cube-outline',      iconOn: 'cube',      label: 'Stock'   },
  { name: 'Search',   iconOff: 'search-outline',     iconOn: 'search',    label: 'Sell'    },
  { name: 'Reports',  iconOff: 'bar-chart-outline',  iconOn: 'bar-chart', label: 'Reports' },
];

const TabItem = ({ tab, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim    = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1.12 : 1,
        useNativeDriver: true,  // ✅ scale — native driver
        friction: 5, tension: 80,
      }),
      Animated.timing(bgAnim, {
        toValue: isActive ? 1 : 0,
        duration: 220,
        useNativeDriver: false, // ✅ backgroundColor — JS driver
      }),
    ]).start();
  }, [isActive]);

  const bgColor = bgAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['rgba(0,0,0,0)', Colors.skyBlueLight],
  });

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
      {/* ✅ Outer — backgroundColor (JS driver) */}
      <Animated.View style={[styles.iconWrap, { backgroundColor: bgColor }]}>
        {/* ✅ Inner — scale (native driver) */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons
            name={isActive ? tab.iconOn : tab.iconOff}
            size={22}
            color={isActive ? Colors.skyBlueDark : Colors.gray500}
          />
        </Animated.View>
      </Animated.View>
      <Text style={[
        styles.label,
        {
          color:      isActive ? Colors.skyBlueDark : Colors.gray500,
          fontWeight: isActive ? '600' : '400',
        },
      ]}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
};

export default function Footer({ activeScreen, navigation }) {
  const insets = useSafeAreaInsets();

  const slideAnim = useRef(new Animated.Value(60)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0, useNativeDriver: true,
        friction: 8, tension: 60,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.nav,
      { paddingBottom: insets.bottom + 4 },
      { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
    ]}>
      <View style={styles.topLine} />
      <View style={styles.inner}>
        {TABS.map(tab => (
          <TabItem
            key={tab.name}
            tab={tab}
            isActive={activeScreen === tab.name}
            onPress={() => navigation.navigate(tab.name)}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: Colors.white,
    borderTopWidth:  0.5,
    borderTopColor:  Colors.gray200,
    shadowColor:     Colors.black,
    shadowOffset:    { width: 0, height: -2 },
    shadowOpacity:   0.06,
    shadowRadius:    10,
    elevation:       10,
  },
  topLine: {
    height: 3, width: 36, borderRadius: 2,
    backgroundColor: Colors.gray200,
    alignSelf:   'center',
    marginTop:   6,
    marginBottom: 2,
  },
  inner:   { flexDirection: 'row', paddingTop: 4, paddingHorizontal: 8 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 4, gap: 2 },
  iconWrap:{ width: 48, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  label:   { fontSize: 10 },
});