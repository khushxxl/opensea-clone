/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Strap from './Strap'

const HeroExplore = () => {
  return (
    <div className="">
      <div>
        <img
          src="https://lh3.googleusercontent.com/xryD6BiWXv4tieZ6i7YOqrHMkupKILo9Y0yrz3JX-V17dcmwk3ic9kRFsYIF8YBZNVhq0k7uuEV5PokfRT8UJG8AM3I3o4LxwgqOyFo=h600"
          alt=""
          className="h-[50vh] w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-start items-start ml-8 space-y-3">
        <div className="-mt-32">
          <img
            src="https://lh3.googleusercontent.com/5VAunHscTO5Nt8WgCezb0i2oVskplFVhVgwmvISfiWQlrBulCxUL7zCYUkRfVF04_47QmNlpWqqdfVraThlhLBEZjuWzajmYDYc9vOc=s168"
            alt=""
            className="rounded-2xl"
          />
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-3xl text-white font-bold">HAPE PRIME</p>
          <img
            src={'https://www.linkpicture.com/q/verify.png'}
            alt=""
            className="h-5 w-5"
          />
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-lg text-white font-bold">
            <span className="text-sm font-normal">By</span> HAPEBEAST
          </p>
          <img
            src={'https://www.linkpicture.com/q/verify.png'}
            alt=""
            className="h-3 w-3"
          />
        </div>

        <div>
          <p className="font-normal text-white">
            8K NEXT-GENERATION, HIGH FASHION HAPES....
          </p>
          <p className="font-normal text-white tracking-wider">See More</p>
        </div>
      </div>
      <Strap />
    </div>
  )
}

export default HeroExplore
