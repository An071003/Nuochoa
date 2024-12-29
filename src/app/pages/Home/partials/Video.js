import React from 'react'

export default function Video() {
  return (
    <div className='mt-4'>
      <video muted autoPlay playsInline loop preload="auto">
        <source src="https://cdn.shopify.com/videos/c/o/v/82ac5b452ae34407aacd35b0bfe2455d.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}