import React from 'react';
import { View, Text } from "react-native";
import SnapsList from './components/snaps/SnapsList'

const Home = () => (
    <View style={{
        flex: 1,
        // backgroundColor: '#293656'
    }}>
        <SnapsList />
    </View>
);

export default Home;