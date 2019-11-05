import React,{useState} from "react";
import firebase from "../../firebase"
const SpellInput = ({ spell,currentUser }) => {
  const [name, setName] = useState(spell.name);
  
  const onUpdate = () =>{
      const db = firebase.firestore()
      if(currentUser){
          db.collection(currentUser.email).doc(spell.id).set({...spell,name})
      }else{
        db.collection("spells").doc(spell.id).set({...spell,name})
      }
      
  }

  const onDelete = () =>{
    const db = firebase.firestore()
    if(currentUser){
        db.collection(currentUser.email).doc(spell.id).delete()
    }else{
        db.collection("spells").doc(spell.id).delete()
    }
    
  }
  return (
    <li>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default SpellInput;
