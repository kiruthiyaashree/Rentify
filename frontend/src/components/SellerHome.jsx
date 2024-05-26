// Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "./Popup/Popup";
import { toast } from "react-toastify";
import PropertyList from "./PropertyList";
import { useNavigate } from "react-router-dom";

const SellerHome = () => {
  const navigate = useNavigate();
  const [isPopupOpenForAdd, setIsPopupOpenforAdd] = useState(false);
  const firstname = JSON.parse(localStorage.getItem("firstname"));

  const handleAddCar = () => {
    setIsPopupOpenforAdd(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpenforAdd(false);
  };

  const handleProfilePhoto=()=>
    {
      navigate('/profile');
    }
  return (
    <>

        <div>
          {/* search bar */}
        </div>

        <div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={(e) => handleAddCar(e)}
              className="px-12 py-2 font-bold text-white bg-blue-800 rounded-md "
            >
              +Add
            </button>
<br/>
            <div className="mx-4">
        <button type="submit"  className="px-12 py-2 font-bold text-white bg-blue-800 rounded-md " onClick={()=>handleProfilePhoto()}>Add Profile</button>
      </div>
          </div>
          
        </div>

      {isPopupOpenForAdd && <Popup firstname ={firstname} closePopup={handleClosePopup} />} 

            <br/>
            <br/>
            <br/>
      
      <PropertyList/>
    </>
  );
};

export default SellerHome;