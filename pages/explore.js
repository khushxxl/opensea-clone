import React from 'react'
import Collection from '../components/Collection'
import HeroExplore from '../components/HeroExplore'
import Navbar from '../components/Navbar'

const Explore = () => {
  return (
    <div className="bg-[#202225]">
      <Navbar />
      <HeroExplore />
      <Collection />
    </div>
  )
}

export default Explore
