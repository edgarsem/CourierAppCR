import React from "react";
import { View, Text, Button}  from "react-native";

import {default as Feather} from 'react-native-vector-icons/Feather';

function DeliveryCanceledScreen({ navigation }) {

    return (
        <View style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        backgroundColor: '#ecf0f1',
                        borderWidth: 5,
                        borderColor: '#176B87' 
                    }}>
                        <View style={{justifyContent: 'space-evenly', borderColor: '#00A9FF',
                            borderWidth: 8,
                            borderRadius: 20,
                            borderCurve: 20,
                        }}
                        >
                            <View style={{
                                marginLeft: 30,
                                marginTop: 40,
                                marginRight: 30,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                                <Feather name='flag' size={60} color='#00A9FF'/>
                            </View>
    
                            <View style={{
                                marginLeft: 10,
                                marginTop: 40,
                                marginRight: 10,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                                }}>
                                <View style={{flexDirection: 'column', marginBottom: 40}}>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Delivery was canceled!
                                    </Text>
                                </View>
    
    
                            </View>
    
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40}}>
                            <View style={{}}>
                                        <Button style={{
                                            }}
                                            title='Proceed'
                                            onPress={() => {navigation.replace("Home")}}
                                        />
                                    </View>
    
                                </View>
                        </View>
                    </View>
      );
};

export default DeliveryCanceledScreen;