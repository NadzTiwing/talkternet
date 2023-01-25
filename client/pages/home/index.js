import React, { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import { createNewRoom, enterRoom, getAllRooms } from '../../redux/chatroom/chatroom.actions';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput, Button, Text  } from 'react-native-paper';
import { layout, size, color } from '../../const';

const Home = (props) => {
    const [username, setUsername] = useState("");
    const [rooms, setRooms] = useState(props.data.room || []);
    const [newRoom, setNewRoom] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");
    const allRooms = props.data.rooms;
    
    const handleEnter = () => {
        //let oldRoom = props.data.rooms.find(room => room.room.toLowerCase() === newRoom.toLowerCase() )
        if(selectedRoom) {
            let selected = selectedRoom.split('-');
            let roomName = selected[0];
            let roomId = parseInt(selected[1]);

            //props.enter(username, oldRoom.room, oldRoom.id); //temporary
            props.enter(username, roomName, roomId);
            props.navigation.navigate('Chatroom');
            return;
        }
        props.createRoom(username, newRoom); 
        props.navigation.navigate('Chatroom');
    }

    useEffect(() => {
        props.getRooms();
        setRooms(props.data.rooms);
        
        console.log("lengths of the rooms" +props.data.rooms.length);
        console.log({Rooms: JSON.stringify(rooms)});
    }, [allRooms.length]); 

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
                
                <View style={styles.selection}>
                    <Text variant="titleMedium" style={styles.selectLabel}>Select a Chatroom:</Text>
                    <Picker
                        selectedValue={selectedRoom}
                        style={styles.selectInput}
                        onValueChange={(room, itemIndex) => setSelectedRoom(room)}
                    >
                        <Picker.Item label="Create New Room" value="" />
                        {rooms.map(room => (
                            <Picker.Item key={`room-${room.id}`} label={room.room} value={`${room.room}-${room.id}`} />
                        ))}
                    </Picker>
                </View>
                {!selectedRoom &&
                    <TextInput
                    label="New Room"
                    value={newRoom}
                    onChangeText={value => setNewRoom(value)}
                    mode="outlined"
                    outlineColor={color.primary}
                    activeOutlineColor={color.primary}
                    style={styles.input}
                    />
                }
                
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
        width: 250,
        backgroundColor: "white",
        
    },
    enterBtn: {
        marginTop: 15, 
        width: 250,
    }
});

const mapStateToProps = (state) => {
    return {
        data: state.chat
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createRoom: (user, room) => dispatch(createNewRoom(user, room)),
        enter: (user, room, roomId) => dispatch(enterRoom(user, room, roomId)),
        getRooms: () => dispatch(getAllRooms())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);