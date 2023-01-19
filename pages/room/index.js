import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { layout } from '../../const';

const Room = () => {

    return(
        <SafeAreaView style={styles.container}>
            <Text>This is a chatroom</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: layout.center
});

export default Room;