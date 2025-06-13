import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {

    const [menu, setMenu] = useState("All") //initializing the first category all
    const {blogs, input} = useAppContext()

    // for filtering out blogs
    const filteredBlogs = ()=>{
      if(input === ''){
        return blogs
      }
      return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item)=> (
            <div key={item} className='relative'>
                <button onClick={()=> setMenu(item)}
                 className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                    {item}
                    {menu === item && (
                        <motion.div layoutId='underline' 
                        transition={{type: 'spring', stiffness: 500, damping: 30}}
                        className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></motion.div>
                    )}
                    
                </button>
            </div>
        ))}
        {/* blog cards */}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs().filter((blog)=> menu === "All" ? true : blog.category === menu).map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}
      </div>
    </div>
  )
}

export default BlogList

/*

🔍 What it does:
It filters the blogs array and returns only those blogs where:

The blog's title contains the user's input (case-insensitive) OR

The blog's category contains the user's input (case-insensitive)

🧠 Line-by-line explanation:
blogs.filter((blog) => ...)
Goes through every blog in the blogs array.

Returns only the blogs for which the condition inside is true.

blog.title.toLowerCase()
Converts the blog title to lowercase so we can compare case-insensitively.

.includes(input.toLowerCase())
Checks whether the user's input is found inside the title/category.

*/


/*

🔍 1. Backticks = Template Literals

`... ${...}`
This is a JavaScript template string, which lets you embed variables and expressions inside ${}.



${menu === item && 'text-white px-4 pt-0.5'}
🧠 What this means in plain English:
✅ If menu === item is true, then return the string 'text-white px-4 pt-0.5'.





<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>

 .my-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 6rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

@media (min-width: 640px) {
  .my-grid {
    grid-template-columns: repeat(2, 1fr);
    margin-left: 4rem;
    margin-right: 4rem;
  }
}

@media (min-width: 768px) {
  .my-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .my-grid {
    grid-template-columns: repeat(4, 1fr);
    margin-left: 10rem;
    margin-right: 10rem;
  }
}


🧱 grid-template-columns
This defines how many columns your grid should have and how wide each column should be.

🧠 repeat(1, 1fr)
This is a shorthand that says:

✅ “Make 1 column, and its width should be 1fr.”

🔍 What's 1fr?
fr = fraction of the available space.

So:

1fr = take all the space

repeat(3, 1fr) = 3 equal columns, each taking 1/3 of the space

repeat(2, 2fr) = 2 columns, each takes twice the space compared to 1fr if used with others

*/