import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';

import { GLOBAL_STYLES } from '../constants/styles';
import { DUMMY_USER_PROFILE } from '../util/dummy-data.js';

import { AntDesign } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar'
import FriendCard from '../components/FriendCard'

function FriendListScreen() {
    return (
        <ScrollView style={styles.page}>
            <View>
                <Text style={styles.headerText}>Friends</Text>
            </View>

            <View>
                <SearchBar />
            </View>

            <View>
                <FriendCard 
                    imagePath={require('../assets/batman.jpeg')}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: GLOBAL_STYLES.colors.brown300,
        flex: 1,
        paddingHorizontal: '10%',
        paddingTop: 16,
    },
    headerText: {
        fontFamily: 'BaiJamjuree-Bold',
        fontSize: 36,
        color: GLOBAL_STYLES.colors.blue300,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
})

export default FriendListScreen;