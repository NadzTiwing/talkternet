import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, Button } from "react-native-paper";
import Home from "../../pages/home";
import Room from "../../pages/room";
import { io } from "socket.io-client";

const Stack = createNativeStackNavigator();


const MainStackNavigator = ({navigation}) => {
    const logout = () => {
        //navigation.navigate('Home');
    }

    const pages = [
        {
            name: "Home",
            component: Home,
            options: {
                headerShown: false
            }
        },
        {
            name: "Chatroom",
            component: Room,
            options: {
                headerTitle: () => <Text variant="headlineMedium">Chat Room</Text>,
                headerRight: () => (
                    <Button
                    mode="outlined"
                    onPress={() => logout()}
                    >Exit</Button>
                ),
            }
        }
    ];

    return(
        <Stack.Navigator>
            {pages.map( page => (
                <Stack.Screen
                    key={page.name}
                    name={page.name}
                    component={page.component}
                    options={page.options || {}}
                />
            ))}
        </Stack.Navigator>
    );
}

export { MainStackNavigator }