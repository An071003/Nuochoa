import React from 'react'

export default function Video() {
  return (
    <div>
      <video muted autoPlay playsInline loop>
        <source src="https://cdn.shopify.com/videos/c/o/v/82ac5b452ae34407aacd35b0bfe2455d.mp4" type="video/mp4" />
        <source src="https://cdn.shopify.com/videos/c/o/v/82ac5b452ae34407aacd35b0bfe2455d.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}