import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { PostContext } from '../contexts/PostContext';

const ProfileScreen = ({ navigation }) => {
    const { user } = useContext(PostContext);

    return(
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
                <View style={{alignItems: 'center'}}>
                    <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 20,
                            color: '#006399',
                            fontWeight: '600',}}>
                        COURIER
                    </Text>

                </View>

                <View style={{
                    marginLeft: 10,
                    marginTop: 40,
                    marginRight: 10,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                    }}>
                    <View style={{flexDirection: 'column', marginBottom: 40}}>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 20,
                            color: '#006399',
                            fontWeight: '600',}}>
                        Your name:
                        </Text>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 16,
                            color: '#3085C3',
                            fontWeight: '600',
                        }}>
                        {user.name} {user.lastName}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'column', marginBottom: 40}}>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 20,
                            color: '#006399',
                            fontWeight: '600',}}>
                        Email:
                        </Text>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 16,
                            color: '#3085C3',
                            fontWeight: '600',
                        }}>
                        {user.email}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'column', marginBottom: 40}}>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 20,
                            color: '#006399',
                            fontWeight: '600',}}>
                        Phone number:
                        </Text>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 16,
                            color: '#3085C3',
                            fontWeight: '600',
                        }}>
                        {user.phone}
                        </Text>
                    </View>
                    
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40}}>
                        <View style={{}}>
                            <Button style={{
                                }}
                                title='Return'
                                onPress={() => {navigation.replace("Home")}}
                            />
                        </View>
                        <View style={{}}>
                            <Button style={{
                                }}
                                title='Log Out'
                                onPress={() => {navigation.replace("Login")}}
                            />
                        </View>

                    </View>

                

            </View>
        </View>
    );
}


export default ProfileScreen;