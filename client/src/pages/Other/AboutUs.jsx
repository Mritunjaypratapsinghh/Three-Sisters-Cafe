import React from 'react'

const AboutUs = () => {
  return (
    <div className=' bg-white menu-background'>
      <div className='section-container  '>
        <div className=' flex flex-col md:flex-row-reverse justify-between  items-center gap-6'>
        {/* Left side */}
        

        <div className='md:w-3/5 space-y-7  bg-simpleLightYellow p-4 rounded-2xl mt-32'>
            <h2 className='text-3xl font-semibold text-slate-700'>About Us</h2>
            <p className='text-gray-800'>
            ThreeSisters Cafe, nestled in the heart of New Delhi, is a cherished establishment owned by three sisters, dedicated to serving the finest desserts and culinary creations. With a specialization in European desserts and refreshing coolant drinks, we take pride in offering a diverse menu featuring delicacies from across the country.</p>
            <p className='text-gray-800'>
            At ThreeSisters Cafe, we believe in delivering a memorable dining experience to our patrons. Our menu is thoughtfully curated to cater to diverse tastes, ensuring there's something for everyone to enjoy. From decadent desserts to savory delights, each dish is crafted with care and expertise to tantalize your taste buds.

</p>
            <p className='text-gray-800'>
            Whether you're seeking a sweet indulgence or a savory treat, we promise to delight your senses with our exquisite offerings. Welcome to a world of culinary delights at ThreeSisters Cafe!            </p>
        </div>

        {/* Right Side */}

        <div className='md:w-2/5 h-screen mt-20'>
          <img src='/About.png' alt='banner' className=' w-full h-[600px]' />
        </div>
    </div>
</div>
</div>
  )
}

export default AboutUs