import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e)=>{
     e.preventDefault();
     setInput(inputRef.current.value)
  }

  const onClear = ()=>{
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
            <p>New: AI feature integrated</p>
            <img src={assets.star_icon} className='w-2.5' alt="" />
        </div>

        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your own <span className='text-primary'> blogging</span> <br/> platform.</h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>

        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
            <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none'/>
            <button type="submit" className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
        </form>

      </div>

      <div className='text-center'>
        {
        input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>
        }
      </div>

      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
    </div>
  )
}

export default Header


/*

🎯 Main Purpose of the Component
This component shows the landing header with a search input. The user can type and submit a search, which is stored in global state via setInput. There’s also a Clear button to reset the input.

🔁 State Management
const { setInput, input } = useAppContext();
This extracts two things from global state/context:

input: current search value

setInput: function to update the search value

Why use context? So that the search input can be used globally across components, like to filter blog cards.

const inputRef = useRef();
Creates a reference to the input DOM element.

You use inputRef.current.value to get whatever the user typed, without needing to bind state via onChange.

🔍 Form Submission
onSubmitHandler

const onSubmitHandler = async (e) => {
  e.preventDefault();
  setInput(inputRef.current.value);
};
e.preventDefault() prevents the default page reload behavior of HTML forms.

Grabs the user input via inputRef.current.value and stores it globally using setInput(...).

onClear

const onClear = () => {
  setInput('');
  inputRef.current.value = '';
};
Clears the global input state and also clears the visible input field manually.

💡 JSX Breakdown
Header Content
js
Copy
Edit
<h1>Your own <span className='text-primary'> blogging</span> platform.</h1>
<p>...Your story starts right here.</p>
Just static content + Tailwind classes for styling.

Form

<form onSubmit={onSubmitHandler}>
  <input ref={inputRef} type="text" placeholder='Search for blogs' required />
  <button type="submit">Search</button>
</form>
The user types in the input → presses the Search button → triggers onSubmitHandler.

Clear Button

{
  input && <button onClick={onClear}>Clear Search</button>
}
This conditionally renders the button only if input has a value.

Clicking it resets both the global input and clears the input field.

Background Image

<img src={assets.gradientBackground} ... />
Adds visual decoration (likely some gradient or soft background).

🔁 Lifecycle Summary
You type something.

When you submit the form:

It grabs the text using inputRef.current.value.

Updates global state using setInput(...).

Any component using input from context will now reflect the new search.

If there's input, a “Clear” button appears that resets everything.

✅ Hooks used in this component:
Hook	Purpose
useRef()	Access the <input> element without re-rendering
useAppContext()	Access and update global input value via Context



*/