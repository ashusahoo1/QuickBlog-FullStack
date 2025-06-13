import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const {id} = useParams()

  const {axios} = useAppContext() //for api call

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])

  // controlled input field for form data in the comment form section , when we add some commnet there it got stored in this state variable 
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async ()=>{
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () =>{
    try {
      const { data } = await axios.post('/api/blog/comments', {blogId: id})
      if (data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if (data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }else{
         toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
  },[])


  // if data is available then it shows the data if not it shows the laoding screen.
  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
      
      <Navbar/>

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Ashu Sahoo</p>
      </div>

{/* thumbnail part */}
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
          <img src={data.image} alt="" className='rounded-3xl mb-5'/>

          <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

          {/* Comments Section */}
          <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Comments ({comments.length})</p>
            <div className='flex flex-col gap-4'>
                {comments.map((item, index)=>(
                  <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                    <div className='flex items-center gap-2 mb-2'>
                      <img src={assets.user_icon} alt="" className='w-6'/>
                      <p className='font-medium'>{item.name}</p>
                    </div>
                    <p className='text-sm max-w-md ml-8'>{item.content}</p>
                    <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Add Comment Section */}
          <div className='max-w-3xl mx-auto'>
             <p className='font-semibold mb-4'>Add your comment</p>
             <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>

                <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none'/>

                <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48' required></textarea>

                <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
             </form>
          </div>

          {/* Share Buttons */}
          <div className='my-24 max-w-3xl mx-auto'>
              <p className='font-semibold my-4'>Share this article on social media</p>
              <div className='flex'>
                <img src={assets.facebook_icon} width={50} alt="" />
                <img src={assets.twitter_icon} width={50} alt="" />
                <img src={assets.googleplus_icon} width={50} alt="" />
              </div>
          </div>
      </div>
      <Footer/>

    </div>
  ) : <Loader/>
}

export default Blog



/*


🧭 useParams — in React Router — is used to read route parameters from the URL.
✅ Example Use Case
Imagine your app has this route:



<Route path="/blog/:id" element={<BlogDetails />} />

Now, if a user visits:

/blog/abc123
Then inside your BlogDetails component, you can get the id (abc123) like this:


*/


/*

before backend:

const fetchBlogData = async ()=> {
  const data = blog_data.find(item => item._id === id )
  setData(data)
  
  }

const fetchComments = async () =>{
  setComments(comments_data)
  }  

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
    },[])


    commnents.length -> it give the no of comments

🔍 Step-by-Step Breakdown:
1. ✅ fetchBlogData is an async function
This function does 2 things:


const data = blog_data.find(item => item._id === id);
setData(data);
It searches the blog_data array (which is an array of blog posts).

It finds the object (i.e. blog post) where item._id === id

Then it saves that found object into React state using setData.

🔁 .find(...) explanation:
If blog_data looks like this:


[
  { _id: "1", title: "Post 1" },
  { _id: "2", title: "Post 2" }
]
And id = "2", then:


blog_data.find(item => item._id === id)
// returns: { _id: "2", title: "Post 2" }


2. 📌 useEffect(() => { fetchBlogData() }, [])
This is a React hook that runs once when the component mounts (loads for the first time).

[] → means it runs only once (on initial load), like componentDidMount in class components.

Inside this, you call fetchBlogData(), which does the actual work.


*/

/*
🧩 Code:

<p className='text-primary py-4 font-medium'>
  Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
</p>

🔍 What’s going on?
✅ 1. data.createdAt
This is a timestamp (likely from your blog post data), e.g.:


data.createdAt = "2024-06-10T15:34:23.000Z"
That's a standard ISO date format from databases like MongoDB.

✅ 2. Moment(data.createdAt)
This wraps the timestamp in Moment.js, which lets you format the date.

✅ 3. .format('MMMM Do YYYY')
This tells Moment how to display the date:

Format	What it shows	Example
MMMM	Full month name	"June"
Do	Day with suffix	"12th", "21st", etc.
YYYY	4-digit year	"2025"

➤ So the final result becomes:
Published on June 12th 2025


*/


/*

2. dangerouslySetInnerHTML:
This tells React:

“Hey, don't escape this HTML — instead, inject it as real HTML into the DOM.”

⚠️ Normally, React escapes HTML for security (to prevent XSS).
But sometimes, like for blog content, you want to inject raw HTML — so you use:

*/



/*

🧠 Why do we use preventDefault()?
Because sometimes, you want to handle things manually instead of letting the browser do its usual thing.

It doesn't reload the page

React handles the logic instead (e.g., sending data via AJAX/fetch)

*/


/*

When you change something in the input (like typing), the value is captured and stored in state using React’s useState hook.

✅ What’s happening here?
onChange

This is a React event handler.

It listens for changes in the input, like when the user types.

(e) => ...

This is an arrow function that receives the event object (e).

e contains info about the event (what triggered it, what element, what value, etc.).

e.target.value

e.target is the actual HTML element (like the <input>).

.value gets the current value typed by the user.

setName(...)

This is a React useState function.

It updates the name state variable to match what the user typed.

*/