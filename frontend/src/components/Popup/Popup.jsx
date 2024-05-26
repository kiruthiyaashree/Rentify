import React, { useEffect, useState } from "react";
import "./Popup.css";
import { toast } from "react-toastify";
import axios from "axios";

export const Popup = ({ closePopup,firstname }) => {
  const [formData, setFormData] = useState({
    firstname:firstname,
    image:'',
    place:'',
    area:'',
    bedrooms:'',
    bathrooms:'',
    college:'',
    hospital:'',
    market:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    try{
      const dataToSend = { ...formData, firstname }; 
      // console.log(dataToSend);
      await axios.post("http://localhost:6700/addproperty", dataToSend);
    }
    catch(error){
    //   toast.error("error on updating the car");
      console.log(error);
    }
    closePopup();
  };

  return (
    <div className="popup-container">
      <div className="popup-body ">
        <div className="flex justify-end p-4">
            <button className="close-btn" onClick={closePopup}>
            &times;
            </button>
        </div>
        <h2 className="text-center font-bold text-xl">Add</h2>
        <br/>

        <form onSubmit={handleSubmit} className="px-12">
            
          <div className="grid grid-cols-3 gap-10">
          {/* Example form fields */}
          <label htmlFor="image">Image : &nbsp; 
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            placeholder="image"
          />
          </label>

          <label htmlFor="place">Place : &nbsp;
          <input
            type="text"
            name="place"
            value={formData.place || ""}
            onChange={handleChange}
            placeholder="place"
          />
          </label>

          <label htmlFor="area">Area : &nbsp;
          <input
            type="text"
            name="area"
            value={formData.area || ""}
            onChange={handleChange}
            placeholder="area"
          />
          </label>

          <label htmlFor="bedrooms">Bedrooms : &nbsp;
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms || ""}
            onChange={handleChange}
            placeholder="bedrooms"
          />
          </label>


          <label htmlFor="bathrooms">Bathrooms : &nbsp;
          <input
            type="text"
            name="bathrooms"
            value={formData.bathrooms || ""}
            onChange={handleChange}
            placeholder="bathrooms"
          />
          </label>



          <label htmlFor="college">College : &nbsp;
          <input
            type="text"
            name="college"
            value={formData.college || ""}
            onChange={handleChange}
            placeholder="college"
          />
          </label>


          <label htmlFor="hospital">Hospital : &nbsp;
          <input
            type="text"
            name="hospital"
            value={formData.hospital || ""}
            onChange={handleChange}
            placeholder="hospital"
          />
          </label>

          <label htmlFor="market">Market : &nbsp;
          <input
            type="text"
            name="market"
            value={formData.market || ""}
            onChange={handleChange}
            placeholder="market"
          />
          </label>





          
          </div>
          {/* Add more fields as needed */}
          <br/>
          <br/>
          <br/>

          <div className="flex justify-center">
          <button type="submit" className="px-8 py-2 border border-black rounded-xl bg-blue-800 text-white hover:border-b-2 hover:border-r-2">ADD</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup