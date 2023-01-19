import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput, Button, Text  } from 'react-native-paper';
import { layout, size, color } from '../../const';

const Home = () => {
    const [username, setUsername] = useState("");
    const [rooms, setRooms] = useState([]);

    const [newRoom, setNewRoom] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("java");
    const handleEnter = () => {

    }

    return(
        <SafeAreaView style={styles.container}>
            <FontAwesome name="wechat" size={size.xxxlarge} color={color.primary} style={styles.icon} />
            <View style={styles.inputSection}>
                <TextInput
                label="Username"
                value={username}
                onChangeText={value => setUsername(value)}
                mode="outlined"
                outlineColor={color.primary}
                activeOutlineColor={color.primary}
                style={styles.input}
                />
                <TextInput
                label="New Room"
                value={newRoom}
                onChangeText={value => setNewRoom(value)}
                mode="outlined"
                outlineColor={color.primary}
                activeOutlineColor={color.primary}
                style={styles.input}
                />
                {/* <View style={styles.selection}>
                    <Text variant="titleMedium" style={styles.selectLabel}>OR Select a chatroom:</Text>
                    <Picker
                        selectedValue={selectedRoom}
                        style={styles.selectInput}
                        onValueChange={(room, itemIndex) => setSelectedRoom(room)}
                    >
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View> */}
                
                <Button 
                mode="contained" 
                buttonColor={color.primary}
                textColor="white"
                style={styles.enterBtn}
                onPress={() => handleEnter()}>
                    ENTER
                </Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: layout.center,
    icon: {
        marginTop: 10,
        marginBottom: 30
    },
    inputSection: {
        alignItems: "center",
        margin: 10
    },
    input: {
        marginBottom:5,
        width: 250,
    },
    selection: {
        marginTop: 15, 
        //width: 200,
        alignSelf: "flex-start",
        // justifyContent: "space-between"
    },
    selectLabel: {
        //alignSelf: "flex-end",
    },
    selectInput: {
        height: 50,
        width: 150,
    },
    enterBtn: {
        marginTop: 10, 
        width: 250,
    }
});

export default Home;