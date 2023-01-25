import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { connectToTcpSocket, disconnectToTcpSocket, saveMessage, getChatHistory } from '../../redux/chatroom/chatroom.actions';
import { View, StyleSheet,  ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Button, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { size, color } from '../../const';
//import dayjs from "dayjs";

import { io } from "socket.io-client";

const Room = (props) => {
    const socket = io("http://10.0.2.2:3000");
    const [message, setMessage] = useState("");
    const [convo, setConvo] = useState([]);
    const rooms = props.data.rooms;
    //const roomId = props.data.roomId;

    const handleSend = async () => {
        let msg = message.replace(/\s/g, '');
        if(!msg) {
            alert("Enter something, please.");
            return;
        }
        const today = new Date();
        let room = props.data.room;
        let roomId = props.data.roomId;
        let data = {
            date: today,
            user: props.data.user,
            message: message
        }
        socket.emit("send", room, data);
        props.saveChat(roomId, data);
        setMessage("");
    }
    
    useEffect(()=>{
        const roomId = props.data.roomId;
        console.log({CHAT_ROOM: JSON.stringify(rooms), roomId: roomId});
        const roomChat = rooms.filter(room => room.id === roomId);
        setConvo(roomChat[0].chat);

        let roomData = { room: props.data.room, user: props.data.user };
        socket.emit("chatroom", roomData);
        socket.on("receive_message", (response) => {
            setConvo(convo => [...convo, response]);
        });

        return () => {
            //socket.off('connect');
            //socket.off('disconnect');
            socket.off('receive_message');
        };
    }, [props.data.room])

    return(
        <View style={styles.container}>
            <ScrollView style={styles.chatSection}>
                {convo && convo.map( (data, index) => {
                    if(data.user === props.data.user) {
                        return(
                            <View style={styles.sender} key={`msg-bubble-${index}-from-${data.user}`}>
                                <Text style={styles.senderText}>{data.message}</Text>
                            </View>
                        )
                    } else {
                        return(
                            <View style={styles.receiver} key={`msg-bubble-${index}-from-${data.user}`}>
                                <Text style={styles.receiverName} >{data.user}</Text>
                                <Text>{data.message}</Text>
                            </View>
                        )
                    }
                })}
                
            </ScrollView>
            <View style={styles.messageSection}>
                <TextInput
                    value={message}
                    onChangeText={value => setMessage(value)}
                    mode="flat"
                    // outlineColor={color.primary}
                    // activeOutlineColor={color.primary}
                    style={styles.input}
                />
                <Button
                buttonColor={color.primary}
                textColor="white"
                mode="contained" 
                onPress={() => handleSend()} 
                style={styles.sendBtn}
                disabled={message ? false : true}>
                    <Ionicons name="send" size={size.medium} color="white"/>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
        //height: "100%",
        // flex: 1,
    },
    chatSection: {
        backgroundColor: "lightgray",
        //flex: 2,
        height: "85%",
    },
    messageSection: {
        //flex: 1,
        height: "15%",
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        backgroundColor: "white"
    },
    input: {
        backgroundColor: "white",
        width: "70%"
    },
    sendBtn: {
        margin: 10
    },
    receiver: {
        padding: 15,
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        alignSelf: "flex-start"
    },
    receiverName: {
        color: "gray",
        fontSize: size.small
    },
    sender: {
        padding: 15,
        margin: 5,
        backgroundColor: "green",
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 25,
        alignSelf: "flex-end"
    },
    senderText: {
        color: "white"
    }
});

const mapStateToProps = (state) => {
    return {
        data: state.chat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        socketConnect: () => dispatch(connectToTcpSocket()),
        socketDisconnect: () => dispatch(disconnectToTcpSocket()),
        saveChat: (roomId, data) => dispatch(saveMessage(roomId, data)),
        getPreviousChat: (roomId) => dispatch(getChatHistory(roomId)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);