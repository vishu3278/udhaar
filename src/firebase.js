// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs, doc, addDoc, setDoc, updateDoc, query, orderBy, limit, where, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ1jIfcGIrXaVKin6ee7pQ_KsE3r0K5DE",
    authDomain: "udhaar-f2428.firebaseapp.com",
    projectId: "udhaar-f2428",
    storageBucket: "udhaar-f2428.appspot.com",
    messagingSenderId: "385759629335",
    appId: "1:385759629335:web:db254575d8156ffb6c4c52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const payeesRef = collection(db, 'payees');
const expenseRef = collection(db, 'expense');
const invoicesRef = collection(db, 'invoices');
const companyRef = collection(db, 'company');

// Get a list of payees from your database

const getPayees = async () => {
    let payees = []

    const payeesSnapshot = await getDocs(payeesRef);

    payeesSnapshot.docs.map(doc => {
        payees.push({ id: doc.id, ...doc.data() })
    });
    // console.log(payees)
    return payees;
}

/*const getPayeesRealtime = async () => {
    const q = query(collection(db, "payees"), orderBy("name"));
    let payees = []
    const unsubscribe = await onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.docs.map(doc => {
            cities.push(doc.data());
            // console.log('loop->',doc.data());
        });
        console.log("Current payees ", cities);
        payees = cities
        return cities
    })
    console.log(unsubscribe, payees)
    return payees
}*/

const getPayeeById = async (id) => {
    const docSnap = await getDoc(doc(db, "payees", id));
    return docSnap.data()
}

const addPayee = async (content) => {
    const docRef = await addDoc(payeesRef, content);
    return docRef
}

const updatePayee = async (id, content) => {
    const upd = await updateDoc(doc(db, 'payees', id), content)
    return upd
}

const getExpense = async () => {
    let exp = []

    const expSnapshot = await getDocs(expenseRef);

    expSnapshot.docs.map(doc => {
        exp.push({ id: doc.id, ...doc.data() })
    });
    // console.log(exp)
    return exp;
}

const addExpense = async (content) => {
    const docRef = await addDoc(expenseRef, content);
    return docRef
}


const getInvoices = async (content) => {
    const inv = []
    const q = query(invoicesRef, orderBy("date", "desc"));
    const invSnapshot = await getDocs(q)
    // const invSnapshot = await getDocs(invoicesRef)
    // console.log(q)

    // var collectionRef = firebase.firestore().collection('invoices');

    invSnapshot.docs.map(doc => {
        inv.push({id: doc.id, ...doc.data()})
    })
    return inv
}

const addInvoice = async (content) => {
    const invRef = await addDoc(invoicesRef, content);
    return invRef
}

const getCompanies = async (content) => {
    const comp = []
    const q = query(companyRef, orderBy("company"));
    const snapShot = await getDocs(q)

    snapShot.docs.map(doc => {
        comp.push({ id: doc.id, ...doc.data()})
    })

    return comp;
}

const addCompany = async (content) => {
    const compRef = await addDoc(companyRef, content);
    return compRef
}

const auth = getAuth();
export { db, addPayee, getPayees, getPayeeById, updatePayee, getExpense, addExpense, getInvoices, addInvoice, auth, getCompanies, addCompany }