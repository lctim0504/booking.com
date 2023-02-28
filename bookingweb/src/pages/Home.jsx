import React from 'react'
import "./home.scss"
import Header from '../components/Header'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <Header />
        </div>
    )
}

export default Home