import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const AddBlog = () => {

    const {axios} = useAppContext()
    const [isAdding, setIsAdding] = useState(false) //will take some time to add theblog to database that is why this isAdding is made
    const [loading, setLoading] = useState(false)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async ()=>{
        if(!title) return toast.error('Please enter a title')

        try {
            setLoading(true);
            const {data} = await axios.post('/api/blog/generate', {prompt: title})
            if (data.success){
                quillRef.current.root.innerHTML = parse(data.content)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) =>{
        try {
            e.preventDefault();
            setIsAdding(true)

            const blog = {
                title, subTitle, 
                description: quillRef.current.root.innerHTML,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            const {data} = await axios.post('/api/blog/add', formData);  //sending form to this api endpoint

            if(data.success){
                toast.success(data.message);
                setImage(false)
                setTitle('')
                setSubTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsAdding(false)
        }
        
    }

    useEffect(()=>{
        // Initiate Quill only once
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
        }
    },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer'/>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setTitle(e.target.value)} value={title}/>

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e => setSubTitle(e.target.value)} value={subTitle}/>

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef}></div>
            {loading && ( 
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
                <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
            </div> )}
            <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog category</p>
        <select onChange={e => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
            <option value="">Select category</option>
            {blogCategories.map((item, index)=>{
                return <option key={index} value={item}>{item}</option>
            })}
        </select>

        <div className='flex gap-2 mt-4'>
            <p>Publish Now</p>
            <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)}/>
        </div>

        <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
            {isAdding ? 'Adding...' : 'Add Blog'}
        </button>

      </div>
    </form>
  )
}

export default AddBlog



/*
✍️ What is Quill?
Quill is a rich text editor for the web — meaning it lets users write and format text like in MS Word or Google Docs inside a webpage.

🔧 Why is it used?
If you're building a blog, admin panel, CMS, or any app where users type and style content (like bold, italic, bullet points, links, images, etc.), Quill gives you that capability.


*/

/*

🔍 What is useRef?
useRef is a React Hook that gives you a way to:

Access DOM elements directly (like input, div, etc.)

Store mutable values that don’t cause re-renders

We initialize both to null because we don’t have access to the DOM elements or instances yet when the component first renders.

*/

/*

🧠 What is .current in React?
.current is a property of the object returned by useRef() in React.

When you write:


const inputRef = useRef(null);
React gives you a ref object like:


{
  current: null
}
After rendering, .current will hold a reference to a DOM element or any value you assign.

*/


/*

🔹 What is <select>?
<select> is an HTML form element that lets users choose one (or more) option(s) from a dropdown list.

✅ Basic Syntax in HTML
html
Copy
Edit
<label for="cars">Choose a car:</label>
<select id="cars" name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="audi">Audi</option>
</select>
Output:
A dropdown with: Volvo, Saab, Audi

*/

/*

🧠 What is FormData?
FormData is a built-in JavaScript object that lets you build a set of key/value pairs representing form fields and their values.
It’s especially useful when you're sending files (like images) along with text data using POST requests, especially via axios or fetch.

🔍 Syntax Explained:

const formData = new FormData();
This creates a new FormData object, like an empty form where you'll insert fields.


formData.append('blog', JSON.stringify(blog))
Adds a field named "blog" to the form.

The blog object (containing data like title, category, description, etc.) is converted to a JSON string using JSON.stringify(...) before adding.

Why? Because FormData only supports string or file values.


formData.append('image', image)
Adds a field named "image" to the form.

image is most likely a File object (like from an <input type="file">).

You are attaching this image so the backend can receive and save it (e.g., with multer).

*/


/*


🔍 finally block in JavaScript (including React)
This syntax comes from try...catch...finally — a structure used for handling errors and cleanup logic in JavaScript.

✅ Syntax Breakdown:

try {
  // code that might throw an error (e.g., API call)
} catch (error) {
  // code that runs if there's an error
} finally {
  // code that ALWAYS runs, error or not
}

🔍 Your code:

} finally {
  setIsAdding(false)
}
💡 What this does:
Regardless of whether the API call succeeds or fails, setIsAdding(false) will be executed.

This is useful for things like:

Turning off loading spinners

Disabling "Submitting..." buttons

Re-enabling form inputs

Updating state that must always reset



*/