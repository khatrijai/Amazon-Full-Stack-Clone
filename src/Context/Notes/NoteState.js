import React from 'react';
import noteContext from "./NoteContext"


const NoteState=(props)=>{
    const a={
        "name":"Harry",
        "class":"5b"
    }
    const [basket,setBasket]=React.useState(a)
    const [user,setUser]=React.useState()
    const update = ()=>{
        setBasket(()=>{
            return ({
                "name":"Jai",
                "class":"5b"
            })
        })
    }

    return (
        <noteContext.Provider value={{basket,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;