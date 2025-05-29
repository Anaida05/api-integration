import React, { useEffect, useState } from 'react'

const FetchComp = () => {
    const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const fetchData = () => {
        setTimeout(async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) {
                    throw new error(`HTTP error! Status: ${response.status}`)
                }
                const result = await response.json();
                setDatas(result)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching data", error)
                setError('An error occurred while fetching the data. Please try again later.');
                setLoading(false)
            }

        }, 1000)
    }
    useEffect(() => {
        fetchData()
    }
        , [])

    return (
        <div>
            {
                loading ? <p>Loading.......</p> :
                    <ul>
                        {
                            datas.map((data, id) => (
                                <li key={id}>
                                    <p>Name : {data.name}</p>
                                    <p>Website : {data.website}</p>
                                </li>

                            ))
                        }
                    </ul>
            }

        </div>
    )
}

export default FetchComp
