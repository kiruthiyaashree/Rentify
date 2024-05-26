import { Link } from "react-router-dom"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SellerHome from "./SellerHome";
import BuyerHome from "./BuyerHome";

const Landing=()=>
    {
        const navigate = useNavigate();
        const [isSeller,setSeller] = useState(false);
        const [isAuthenticated,setIsAuthenticated] = useState(false);
    useEffect(()=>
    {
        const firstname=localStorage.getItem('firstname');
        // console.log(username);
        setIsAuthenticated(!!firstname);


        const fetchUserType = async () => {
            try {
              const searchFirstName = JSON.parse(localStorage.getItem("firstname"));
              if(searchFirstName){
              const res = await axios.get("http://localhost:6700/userType", {
                params: { searchFirstName }
              });
              const userType = res.data.message;
              localStorage.setItem('usertype',userType);
              if(userType == "seller")
                {
                    setSeller(true);
                }
            }
            } catch (error) {
              console.error("Error:", error);
            }
        
          };
          fetchUserType();
    },[]);

    
    const handleSignOut=()=>
    {
        localStorage.removeItem('firstname');
        localStorage.removeItem('usertype');
        localStorage.removeItem('sellerdetails');

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
                
{
    isSeller ?
    (
        <div>
            <SellerHome/>
        </div>
    ):
    (
        <div>
            <BuyerHome/>
        </div>
    )
}


            </>
        )
    }

export default Landing