import React from 'react'
import "./home.scss"
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <Header />
            <Announcement />
        </div>
    )
}

export default Home