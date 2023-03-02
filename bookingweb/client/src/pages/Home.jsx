import React from 'react'
import "./home.scss"
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Feature from '../components/Feature'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <Header />
            <Announcement type={"upper"}/>
            <Feature />
            <Announcement type={"lower"}/>
            <Footer />
        </div>
    )
}

export default Home