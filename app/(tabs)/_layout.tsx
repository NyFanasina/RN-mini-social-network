import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function Layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="Home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    )
                }}

            />
            <Tabs.Screen
                name="PostForm"
                options={{
                    title: "Poster",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Moi",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="Settings"
                options={{
                    title: "Settings",
                    href: null
                }}
            />
            <Tabs.Screen
                name="Search"
                options={{
                    title: "Search",
                    href: null
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Login",
                    href: null
                }}
            />
        </Tabs>
    );
}
