import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>

        <div>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
            <p className='max-w-[410px] mt-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?</p>
        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
        {/* section is for individual index for the 4 columns made is asset.js */}
            {footer_data.map((section, index)=> (
                <div key={index}>
                    <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {section.links.map((link, i)=> (
                            <li key={i}>
                                <a href="#" className='hover:underline transition'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>


      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 © QuickBlog Ashu - All Right Reserved.</p>
    </div>
  )
}

export default Footer



/*

section is the actual object at that index and index is automatically assigned by map syntax its like the index of a array example.



🔹 What is index?
Yes — in this context, index is like the position number of each object in the array.

Given this:


const footer_data = [
  { title: "Quick Links", links: [...] },  // index = 0
  { title: "Need Help?", links: [...] },   // index = 1
  { title: "Follow Us", links: [...] }     // index = 2
];
Here:

footer_data[0] → index = 0

footer_data[1] → index = 1

footer_data[2] → index = 2

So:

index is not a real "ID" — it’s the position in the array.

It is automatically provided by .map().

🔹 What is section?
section is the actual object at that index.

Example:
When you're at index = 1, section will be:


{
  title: "Need Help?",
  links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
}
So:

section.title → "Need Help?"

section.links → [ ... array of links ... ]




*/