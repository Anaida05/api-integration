import React, { useEffect, useState } from 'react'
import axios from "./api/axios"

const AxiosComp = () => {
    const [userData, setUserData] = useState([])
    
    const [error,setError] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get("/users")
            setUserData(response.data)
            
        } catch (error) {
            console.log("Error fetching data",error)
            setError(true)
        }
    }

    const createUser = async()=>{
        try{
            const newUser = {
                name : "",
                email : ""
            }
            const response = await axios.put("/post",newUser)
            console.log('response', response.data);
        }
        catch(error){   
            console.log("Error creating user",error)
            setError(true)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <ul>
                {
                    userData.map((data,id)=>(
                        <li key={id}>
                            <p>Name : {data.name}</p>
                            <p>Username : {data.username}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AxiosComp
