import { Link } from "react-router-dom"
import { useState,useEffect } from "react";
const NavBar=()=>
    {
        const [isAuthenticated,setIsAuthenticated] = useState(false);

        const firstname=localStorage.getItem('firstname');
        // console.log(username);
        setIsAuthenticated(!!firstname);
        const handleSignOut=()=>
            {
                localStorage.removeItem('firstname');
                localStorage.removeItem('usertype');
                localStorage.removeItem('sellerDetails');
        
                setIsAuthenticated(false);  
            }
        return (
            <>

{
                    isAuthenticated ?
                    (
                        <div className='flex justify-end'>
                            <Link to='/' className='cursor-pointer'><p className='flex mx-2 my-10 px-3 py-2'>{localStorage.getItem('firstname').replace(/"/g, '')}</p></Link>
                            <button className='mx-2 my-10 px-3 py-2 border border-black rounded-xl hover:bg-blue-800 hover:text-white' onClick={handleSignOut}>Sign out</button>
                        </div>
                    ):
                    (
                    <div>
                        <ul className="flex justify-end">
                            <Link to='/signin' className="cursor-pointer"><li className="mx-2 my-10 px-3 py-2 border border-black rounded-xl hover:bg-blue-800 hover:text-white">Login</li></Link>
                            <Link to='/signup' className="cursor-pointer"><li className="mx-2 my-10 px-3 py-2 border border-black rounded-xl hover:bg-blue-800 hover:text-white">SignUp</li></Link>
                        </ul>
                    </div>
                    )
                }
            </>
        )
    }
    export default NavBar