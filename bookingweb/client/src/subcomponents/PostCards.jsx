import React from 'react'
import PostCard from './PostCard'
import { Attractions } from '../data'
import "./postCards.scss"

const Postcards = () => {
    return (
        <div className='postcards'>
            <div className="line">
                <PostCard dataArray={Attractions.slice(0, 2)} />
            </div>
            <div className="line">
                <PostCard dataArray={Attractions.slice(2, 5)} />
            </div>
        </div >
    )
}

export default Postcards