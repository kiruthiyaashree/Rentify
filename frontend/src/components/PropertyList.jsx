import { useState,useEffect } from "react"
import axios from "axios";
import PopupForUpdate from './Popup/PopupForUpdate'
const PropertyList=()=>
    {
        const [isPopupOpen, setIsPopupOpen] = useState(false);
        const [selectedproperty,setSelectedproperty] = useState(null);

        const [list,setList]= useState([]);
        useEffect(() => {
            const fetchPropertyDetails = async () => {
                try {
                    const response = await axios.get('http://localhost:6700/property-details');
                    setList(response.data);

                } catch (error) {
                    console.error('Error fetching prop details:', error);
                }
            };
    
            fetchPropertyDetails();
        }, []); 

        const handleUpdate = (e,prop) => {
            // console.log("clicked");
            e.preventDefault();
            setSelectedproperty(prop);
            setIsPopupOpen(true); 
          };

          const handleClosePopup = () => {
            setIsPopupOpen(false);
          };
        return (
            <>
                <div className="flex flex-col items-center px-32 gap-y-5">
          {list.map((prop, index) => {
            return (
              <div
                key={index}
                className=" border border-black w-[90rem] rounded-md grid grid-cols-[1fr_5fr_1fr]"
              >
                <div className="flex justify-center">
                  <img
                    src={prop.image}
                    className="h-[8rem] p-3"
                    alt="reloading page"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between gap-10  py-1">
                    <p>Place : {prop.place}</p>
                    <p>Area : {prop.area}</p>
                  </div>

                  <div className="flex justify-between gap-10 py-1">
                    <p>{prop.bedrooms} bedrooms</p>
                    <p>{prop.bathrooms} bathrooms</p>
                  </div>

                  <div className="flex justify-between gap-10 py-1">
                    <p className="px-4"><b>College: </b>{prop.college}</p>
                    <p className="px-4"><b>Hospital: </b>{prop.hospital}</p>
                    <p className="px-4"><b>Market: </b>{prop.market}</p>
                  </div>
                </div>

                {/* button section begins */}
                <div className="flex  justify-evenly">
                  <div className="flex justify-center items-center">
                    <button type="submit"
                      onClick={(e)=>handleUpdate(e,prop)} 
                      className="rounded-md px-8 py-2 bg-yellow-200/100 flex items-center"
                    >
                      {/* <EditIcon /> */}
                      Update
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {isPopupOpen && <PopupForUpdate closePopup={handleClosePopup} prop={selectedproperty}/>}
            </>
        )
    }
export default PropertyList