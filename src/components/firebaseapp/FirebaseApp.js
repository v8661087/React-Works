import React, { useState,useEffect, useContext,useCallback} from "react";
import firebase from "../../firebase";
import { AuthContext } from "../commentapp/Auth";
import { Link } from "react-router-dom";
import SpellInput from "./SpellInput"
const FirebaseApp = () => {
    const { currentUser } = useContext(AuthContext);
    const [spells, setSpells] = useState([]);
    const [newSpellName, setnewSpellName] = useState([]);
  
    const fetchData = useCallback(() => {
      const fetchingData = () => {
        if (currentUser) {
          firebase
            .firestore()
            .collection(currentUser.email)
            .onSnapshot(snapshot => {
              const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setSpells(data);
              console.log("fetchData");
            });
        }else{
          firebase
            .firestore()
            .collection("spells")
            .onSnapshot(snapshot => {
              const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setSpells(data);
              console.log("fetchData");
            });
        }
      };
      fetchingData();
    }, [currentUser]);
  
    useEffect(() => {
        fetchData();
    }, [fetchData]);
  
    const onCreate = () => {
      const db = firebase.firestore();
      if(currentUser){
        db.collection(currentUser.email).add({ name: newSpellName });
      }else{
        db.collection("spells").add({ name: newSpellName });
      }
      setnewSpellName("");
    };
    return ( 
        <>
        <h1>FirebaseApp</h1>
        <div>hi {currentUser ? currentUser.email : ""}</div>
        {currentUser ? (<>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
          <p>個人</p></>
      ) : (
        <>
        <Link to="./FirebaseApp/Login">Login</Link><br/>
        <Link to="./FirebaseApp/SignUp">Sign Up</Link>
        <p>公開資料</p>
        </>
      )}

<ul>
        <input
          value={newSpellName}
          onChange={e => setnewSpellName(e.target.value)}
        />
        <button onClick={onCreate}>Create</button>
        {spells.map(spell => (
          <SpellInput spell={spell} key={spell.id} currentUser={currentUser} />
        ))}
      </ul>
        </>
     );
}
 
export default FirebaseApp;
