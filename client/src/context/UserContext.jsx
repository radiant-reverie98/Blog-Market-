import { createContext, useEffect, useState } from "react";
import { URL } from "../url";
import axios from "axios";



export const UserContext = createContext()

export function UserContextProvider({children}) {
    const [user,setUser] = useState(null)

    const getUser = async ()=>{
        try{
            const response = await axios.get(URL+'/api/auth/refetch',{withCredentials:true})
            //console.log(response)
            setUser(response.data)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getUser()
    },[])
    //console.log(user)
  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}

