import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UseFetch = (url) => {
    const [data, setData] = useState([]);//axios要傳入的資料
    const [loading, setLoading] = useState(false);//紀錄連線情況
    const [error, setError] = useState("");//回報錯誤的useState

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); //load資料開始，先顯示skeleton
            try {
                const response = await axios.get(url);
                //axios.get最重要的資料 且url是feature那邊傳入的/hotels
                setData(response.data);
            } catch (error) {
                setError(error)//如果有錯誤也紀錄進去setError State
            }
            setLoading(false);//load資料結束
        }
        fetchData()
    }, [])

    return { data, loading, error }
}

export default UseFetch