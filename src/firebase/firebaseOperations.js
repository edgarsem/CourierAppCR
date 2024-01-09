import { child, equalTo, onValue, orderByChild, push, query, ref, remove, set, update } from 'firebase/database';
import { database, firestoreDatabase } from './firebaseConfig';
import { addDoc, collection, doc, getDocs, updateDoc, where } from 'firebase/firestore';

export const deliveryDocConverter = async (id, data) => {
    return({
        id: id,
        title: data.title,
        length: data.length,
        width: data.width,
        height: data.height,
        weight: data.weight,
        details: data.details,
        userPhone: data.userPhone,
        userAddress: data.userAddress,
        userGPS: data.userGPS,
        recipientName: data.recipientName,
        recipientLastName: data.recipientLastName,
        recipientPhone: data.recipientPhone,
        recipientAddress: data.recipientAddress,
        recipientGPS: data.recipientGPS,
        distance: data.distance,
        duration: data.duration,
        cost: data.cost,
        userUID: data.uid,
        courierUID: data.courierUID,
        courierGPS: data.courierGPS,
        status: data.status
    });
}


export const handleCreateUser = (uid, name, lastName, email, phone) => {
    const postData = {
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
    };
    const updates = {};
    updates['courier/' + uid] = postData;
    update(ref(database), updates);
    const userData = {
        uid: uid,
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
    };
    return userData
}

export const handleGetUserData = (uid) => {
    return new Promise((resolve, reject) => {
        const userRef = ref(database, 'courier/' + uid);
        onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
                const userData = {
                    uid: uid,
                    name: snapshot.val().name,
                    lastName: snapshot.val().lastName,
                    email: snapshot.val().email,
                    phone: snapshot.val().phone,
                };
                resolve(userData);
            } else {
                reject("User data not found");
            }
        }, (error) => {
            reject(error);
        });
    });
};

export const handleGetAllDeliveries = async () => {
    try {
        const docArray = [];
        const q = query(collection(firestoreDatabase, "deliveries"), where("status", "==", "open"));
        const querySnapshot = await getDocs(q);

        for (const doc of querySnapshot.docs) {
            let tempObject = await deliveryDocConverter(doc.id, doc.data());
            docArray.push(tempObject);
        }

        return docArray;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const handleAcceptDelivery = async (deliveryId, uid, latitude, longitude) => {
    try {
        const docRef = doc(firestoreDatabase, "deliveries", deliveryId);
        await updateDoc(docRef, {
            courierUID: uid,
            courierGPS: {
                latitude: latitude,
                longitude: longitude,
            },
            status: 'accepted'
        })
    } catch (e) {
        console.error(e);
    }
};


export const handleUpdateCourierLocation = async (coords, deliveryId) => {
    try {
    const courierDocRef = doc(firestoreDatabase, 'deliveries', deliveryId);
    await updateDoc(courierDocRef, {
        courierGPS: {
            latitude: coords.latitude,
            longitude: coords.longitude,
        }
    });
    } catch (e) {
        console.log(e)
    }
};


export const handleUpdateDeliveryState = async (newState, deliveryId) => {
    const deliveryDocRef = doc(firestoreDatabase, 'deliveries', deliveryId);
    await updateDoc(deliveryDocRef, {
        status: newState,
    });
};


export const handleDeliveryHistory = (uid, parcel) => {
    const postData = {
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
    };
    const updates = {};
    updates['courier/' + uid] = postData;
    update(ref(database), updates);
    const userData = {
        uid: uid,
        name: name,
        lastName: lastName,
        email: email,
        phone: phone,
    };
    return userData
}

export const handleGetDeliveryHistory = (uid) => {
    return new Promise((resolve, reject) => {
        const reff = ref(database, 'deliveries/');
        const values = query(reff, orderByChild('courierUID'), equalTo(uid));
        onValue(values, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.keys(data).map(key => ({ ...data[key], id: key }));
                resolve(dataArray);
            } else {
                resolve([]);
            }
        }, (error) => {
            reject(error);
        });
    });
};