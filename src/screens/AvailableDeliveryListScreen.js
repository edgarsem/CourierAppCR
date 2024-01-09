import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../contexts/PostContext";
import { View, Text, Button, Modal, FlatList, Pressable } from "react-native";
import { styles } from "../styles/StyleSheet";
import { handleAcceptDelivery, handleGetAllDeliveries } from "../firebase/firebaseOperations";

import * as Location from 'expo-location';

function AvailableDeliveryList({ navigation }) {
    const { user } = useContext(PostContext);
    const [ openDeliveryList, setOpenDeliveryList ] = useState([])
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ selectedDelivery, setSelectedDelivery ] = useState()
    const [ location, setLocation ] = useState()

    useEffect(() => {
        const getAllDeliveries = async () => {
            try {
                const tempList = await handleGetAllDeliveries();
                setOpenDeliveryList(tempList);
            } catch (error) {
                console.log(error);
            }
        };

        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            setLocation(location);
        };
        getAllDeliveries();
        getLocation();
    }, []);



    const handleDeliveryClick = (delivery) => {
        setSelectedDelivery(delivery)
        setModalVisible(true)
    }


    const handleDeliveryAccept = async () => {
        try{
            handleAcceptDelivery(selectedDelivery.id, user.uid, location.coords.latitude, location.coords.longitude)
            setModalVisible(false)
            navigation.replace("Delivery Status", selectedDelivery)
        } catch(e) {
            console.log(e)
        }
    }


    return(

                    <View style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        backgroundColor: '#ecf0f1',
                        borderWidth: 5,
                        borderColor: '#176B87' 
                    }}>
                        

                        <Modal
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            setModalVisible(false);
                            }}
                        >
                            <View style={{flex: 1,
                                justifyContent: "center",
                                alignItems: "center"}}
                            >
                            <View style={{
                                width: 360,
                                margin: 2,
                                backgroundColor: "#ecf0f1",
                                borderRadius: 20,
                                padding: 8,
                                borderColor: '#00A9FF',
                                borderWidth: 8,
                                borderRadius: 20,
                                borderCurve: 20,
                                paddingVertical: 20}}>

                                {selectedDelivery && (
                                <View style={{ alignItems: "flex-start", marginLeft: 10}}>
                                    <Text style={[styles.titleStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.title}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Details:
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                            {selectedDelivery.length}x{selectedDelivery.width}x{selectedDelivery.height} cm
                                        </Text>
                                        <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                            {selectedDelivery.weight} g
                                        </Text>
                                    </View>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.details}
                                    </Text>
                                    
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Sender's phone number:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.userPhone}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Sender's address:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.userAddress.substring(10)}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Recipient's full name:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.recipientName} {selectedDelivery.recipientLastName}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Recipient's phone number:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.recipientPhone}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Recipient's address:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.recipientAddress.substring(10)}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Approximate delivery distance:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.distance} km
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Approximate delivery duration:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.duration} min
                                    </Text>
                                    <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 16,
                                        color: '#3085C3',
                                        fontWeight: '600',
                                    }}>
                                    Delivery cost:
                                    </Text>
                                    <Text style={[styles.contentHomeTextStyle, {marginBottom: 10}]}>
                                        {selectedDelivery.cost} Eur
                                    </Text>
                                </View>
                                )}
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                                    <Button
                                        title='Cancel'
                                        onPress={() => {setModalVisible(false)}}
                                    />
                                    <Button
                                        title='Accept'
                                        onPress={() => {handleDeliveryAccept()}}
                                    />
                                </View>
                            </View>
                            </View>
                        </Modal>

                        <View style={{justifyContent: 'space-evenly', borderColor: '#00A9FF',
                            borderWidth: 8,
                            borderRadius: 20,
                            borderCurve: 20,
                        }}
                        >
                            <View style={{alignItems: 'center', marginTop: 30, marginBottom: 20}}>
                                <Text style={{
                                        marginLeft: 20,
                                        marginRight: 20,
                                        fontSize: 20,
                                        color: '#006399',
                                        fontWeight: '600',}}>
                                    Delivery queries
                                </Text>
                            </View>

                            <FlatList
                                data={openDeliveryList}
                                keyExtractor={(item, index) => item.id || String(index)}
                                renderItem={({ item }) => (
                                    <Pressable onPress={() => {handleDeliveryClick(item)}}>
                                        <View style={{
                                            flexDirection: 'row', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            borderColor: '#00A9FF',
                                            borderWidth: 8,
                                            }}>
                                            <View style={{flexDirection: 'column'}}>
                                                <Text style={styles.titleStyle}>
                                                    {item.title}
                                                </Text>
                                                <Text style={[styles.contentHomeTextStyle, {flexWrap: 'wrap'}]}>
                                                    {item.userAddress.substring(10)}
                                                </Text>
                                                <Text style={styles.contentHomeTextStyle}>
                                                    {item.recipientAddress.substring(10)}
                                                </Text>
                                            </View>

                                            <View style={{flexDirection: 'column', marginRight: 10}}>
                                                <Text style={styles.contentHomeTextStyle}>
                                                    {item.length}x{item.width}x{item.height} cm
                                                </Text>
                                                <Text style={styles.contentHomeTextStyle}>
                                                    {item.weight} g
                                                </Text>
                                                <Text style={styles.contentHomeTextStyle}>
                                                    {item.distance} km
                                                </Text>
                                                <Text style={styles.contentHomeTextStyle}>
                                                    {item.cost} Eur
                                                </Text>
                                            </View>

                                        </View>
                                    </Pressable>
                                )}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40}}>
                                <View style={{}}>
                                    <Button style={{
                                        }}
                                        title='Return'
                                        onPress={() => {navigation.replace("Home")}}
                                    />
                                </View>
                            </View>

                            

            </View>
        </View>

    );
};

export default AvailableDeliveryList;