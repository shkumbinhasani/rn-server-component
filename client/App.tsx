import {Button, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import {QueryClient, useQuery} from "@tanstack/react-query";
import type * as React from "react";
import { SC } from './lib/rn-server-component';

const queryClient = new QueryClient();
export default function App() {
    const query = useQuery({
        queryKey: ['test-component'],
        queryFn: async () => {
            const res = await fetch('https://3000.shkumbinhsn.com/api');
            return await res.json();
        },
    }, queryClient);

    return (
        <View style={styles.container}>
            <SC.HomeBanner
                data={query.data}
                buttonPress={(data) => console.log('button pressed', data)}
            />
            <Text>Open up App.tsx to start working on your app!</Text>
            {query.isPending && <Text>Loading...</Text>}
            {query.isError && <Text>Error</Text>}
            {/*{query.isSuccess && configToComponent(query.data, {*/}
            {/*    test: 'trim',*/}
            {/*    ['buttonPress']: () => console.log('button pressed')*/}
            {/*})}*/}
            <Button title={'Refresh'} onPress={() => query.refetch()}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
