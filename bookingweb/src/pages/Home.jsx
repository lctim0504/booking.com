import React from 'react'
import "./home.scss"
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Feature from '../components/Feature'

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <Header />
            <Announcement />
            <Feature />
        </div>
    )
}

export default Home