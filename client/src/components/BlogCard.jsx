 import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

    const {title, description, category, image, _id} = blog;
    const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
      <img src={image} alt="" className='aspect-video'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html": description.slice(0,80)}}></p>
      </div>
    </div>
  )
}

export default BlogCard


/*

🧠 Q: Is React seeing the items that are passed along with the BlogCard?
✅ Yes — exactly. React doesn't care what the original variable was called (like blog_data).
What matters is what you pass to the component when you render it.

so it doesnt matter if its written blog_data in asset.js or anything like that.



aspect-video:
 aspect-ratio: 16 / 9;

 ----------------------  ← Width (16 units)
|                    |
|                    |  ← Height (9 units)
|                    |
----------------------

<p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html": description.slice(0,80)}}></p>
It takes the first 80 characters from the description string — including spaces, tags, punctuation, etc.

*/