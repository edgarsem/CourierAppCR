import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { handleUpdateCourierLocation, handleUpdateDeliveryState } from "../firebase/firebaseOperations";

import * as Location from 'expo-location';

import MapView, { Marker } from "react-native-maps";
import { firestoreDatabase } from "../firebase/firebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import MapViewDirections from "react-native-maps-directions";

function DeliveryStatusScreen({ navigation, route }) {
    const delivery = route.params
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDDGK7Wsg291cIoGJX0QtCsXma7zVnuFB0';
    const [goalLocation, setGoalLocation] = useState(delivery.userGPS);
    const [location, setLocation] = useState(null);
    const [ currentStatus, setCurrentStatus ] = useState('Accepted')
    const [cancelButtonState, setCancelButtonState] = useState(true)

    useEffect(() => {
        startLocationUpdates();

        const checkStatus = (state) => {
            if(state ===  'canceled') {
                navigation.replace("Delivery Canceled")
            }
            if(state !== 'accepted') {
                setCancelButtonState(false)
            }
        }
        const unsubscribe = onSnapshot(doc(firestoreDatabase, 'deliveries', delivery.id), (doc) => {
            if (doc.exists()) {
                console.log(doc.data())
                const data = doc.data()
                checkStatus(data.status)
            }
        });

        return () => unsubscribe();
    }, []);




    const startLocationUpdates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                distanceInterval: 10,
                timeInterval: 10000,
            },
            (newLocation) => {
                setLocation(newLocation.coords);
                handleUpdateCourierLocation(newLocation.coords, delivery.id);
            }
        );
    };

    const handleDeliveryUpdate = () => {
        let newState = null
        switch (currentStatus){
            case 'Accepted':
                newState = 'Delivering'
                setCurrentStatus(newState)
                setGoalLocation(delivery.recipientGPS)
                handleUpdateDeliveryState('delivering', delivery.id)
                break;
            case 'Delivering':
                newState = 'Completed'
                setCurrentStatus(newState)
                handleUpdateDeliveryState('completed', delivery.id)
                navigation.replace("Delivery Completed")
                break;
            default:
                break;
        }
    }


    const handleCancelDelivery = async () => {
        setCurrentStatus('Canceled')
        handleUpdateDeliveryState('canceled', delivery.id)
        navigation.replace("Delivery Canceled")
    }


    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ecf0f1',
            borderWidth: 5,
            borderColor: '#176B87' 
        }}>
            
            {location && (
            <MapView 
                style={{alignSelf: 'stretch', flex: 1}} 
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                    <MapViewDirections
                        origin={location}
                        destination={goalLocation}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={6}
                        strokeColor="red"
                        mode="DRIVING"
                    />
                    <Marker
                        coordinate={location}
                        pinColor={'red'}
                        title="Your Location"
                    />
                    <Marker
                        coordinate={delivery.userGPS}
                        pinColor={'blue'}
                        title="Sender's Location"
                    />
                    <Marker
                        coordinate={delivery.recipientGPS}
                        pinColor={'blue'}
                        title="Recipient's Location"
                    />
                    
            </MapView>
            )}
            
            <View style={{ flex: 1 , flexDirection: 'column', alignItems: 'center'}}>
                <View style={{ marginVertical: 20, borderColor: '#00A9FF', borderWidth: 6, borderRadius: 10}}>
                    <Text style={{
                        marginLeft: 20,
                        marginRight: 20,
                        fontSize: 20,
                        color: '#006399',
                        fontWeight: '600',}}>
                        Delivery Status: {currentStatus}
                    </Text>
                </View>                
        
                <View style={{
                    marginLeft: 10,
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
                        Sender's location:
                        </Text>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 16,
                            color: '#3085C3',
                            fontWeight: '600',
                        }}>
                        {delivery.userAddress}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'column', marginBottom: 40}}>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 20,
                            color: '#006399',
                            fontWeight: '600',}}>
                        Recipient's location:
                        </Text>
                        <Text style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 16,
                            color: '#3085C3',
                            fontWeight: '600',
                        }}>
                        {delivery.recipientAddress}
                        </Text>
                    </View>

                    
                </View>
                <View style={{flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
                    <Button style={{
                        }}
                        title='Update'
                        onPress={() => {handleDeliveryUpdate()}}
                    />
                    {cancelButtonState && (
                        <View style={{marginLeft: 30}}>
                            <Button style={{
                            }}
                            title='Cancel'
                            onPress={() => {handleCancelDelivery()}}
                            />
                        </View>
                    )}
                </View>

            </View>
        </View>
    );
};

export default DeliveryStatusScreen;

