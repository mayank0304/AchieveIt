import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {

  return (
    <Tabs
       screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1E293B",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginHorizontal: 40,
          marginBottom: 30,
          position: "absolute",
          paddingTop: 5
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 13
        },
        tabBarActiveTintColor: '#06B6D4',    // Cyan for active tab
        tabBarInactiveTintColor: '#64748B',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist" color={color} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.on.doc" color={color} />,
        }}
      />
    </Tabs>
  );
}
