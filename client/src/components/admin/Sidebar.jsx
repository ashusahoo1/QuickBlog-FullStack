import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>

      <NavLink end={true} to='/admin' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.home_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Dashboard</p>
      </NavLink>

      <NavLink to='/admin/addBlog' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.add_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Add blogs</p>
      </NavLink>

      <NavLink to='/admin/listBlog' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.list_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Blog lists</p>
      </NavLink>

      <NavLink to='/admin/comments' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
        <img src={assets.comment_icon} alt="" className='min-w-4 w-5 '/>
        <p className='hidden md:inline-block'>Comments</p>
      </NavLink>

    </div>
  )
}

export default Sidebar


/*

✅ What is <NavLink>?
It's like a regular <a> tag, but made for React Router with extra features.


import { NavLink } from 'react-router-dom';

<NavLink to="/home">Home</NavLink>
This navigates to /home without refreshing the page.



*/


/*


so basically it in true on the base admin page only , thats why end = true and if is active is true then its highlighted othwerwise not , so the option that is choosed makes it active or highlighted that is why there is given is active.

✅ The Full JSX Snippet:

<NavLink
  end={true}
  to="/admin"
  className={({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`
  }
/>
🔍 Line-by-Line Breakdown:
1. <NavLink>
This is like a <Link>, but it knows whether it's the current (active) route.

2. to="/admin"
This is the route path it links to.

When you click it, it navigates to /admin.

3. end={true}
This means the NavLink is only active on the exact path /admin, not on subpaths like /admin/addBlog.

Without end, /admin/addBlog would also activate the /admin NavLink — which we don’t want in sidebars.

4. className={({ isActive }) => ...}
This is a function that gets a special argument: isActive.

If the current URL matches the path, isActive === true

Otherwise, false

You're dynamically returning different Tailwind CSS classes based on that.

5. Base classes:

flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
These apply always. They control:

Flex layout

Padding

Cursor style

Min-width at larger screen sizes

6. Conditional classes with isActive:

${isActive && "bg-primary/10 border-r-4 border-primary"}
If the route is active:

Add:

bg-primary/10: background highlight

border-r-4: thick right border

border-primary: color of that border

If not active, nothing extra is added.


*/