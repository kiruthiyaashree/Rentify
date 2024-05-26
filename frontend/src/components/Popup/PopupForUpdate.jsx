import { useState,useEffect } from "react"
import axios from "axios";


const PopupForUpdate=({closePopup,prop})=>
    {
        const [formData, setFormData] = useState({
            id:prop._id,
            image:prop.image,
            place:prop.place,
            area:prop.area,
            bedrooms:prop.bedrooms,
            bathrooms:prop.bathrooms,
            college:prop.college,
            hospital:prop.hospital,
            market:prop.market,
          });


          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
              ...formData,
              [name]: value,
            });
          };
        
          const handleSubmit = async(e) => {
            // sends details to the index.jsx file to be updated
            try{
              await axios.post("http://localhost:6700/update-property",formData);
            //   toast.success("Updated successfully");
            }
            catch(error){
            //   toast.error("error on updating the car");
              console.log(error);
            }
            closePopup();
          };


        return(
            <>
            <div className="popup-container">
      <div className="popup-body ">
        <div className="flex justify-end p-4">
            <button className="close-btn" onClick={closePopup}>
            &times;
            </button>
        </div>
        <h2 className="text-center font-bold text-xl">Update</h2>
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
          <button type="submit" className="px-8 py-2 border border-black rounded-xl bg-blue-800 text-white hover:border-b-2 hover:border-r-2">UPDATE</button>
          </div>
        </form>
      </div>
    </div>
            </>
        )
    }
    export default PopupForUpdate