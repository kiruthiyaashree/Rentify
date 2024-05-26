import { useEffect, useState } from "react";

const SellerDetails = () => {
    const [interestedList, setInterestedList] = useState([]);

    useEffect(() => {
        const fetchInterestedList = () => {
            setInterestedList(JSON.parse(localStorage.getItem('sellerDetails')));
        }
        fetchInterestedList();
    }, []);


    return (
        <>
        <br/>
        <br/>
        <br/>

            <div className="mx-13">
                <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-10 w-[75%]">
                    {
                        interestedList.map((prop,index)=>
                        {
                            return (
                                <div key={index} className="border rounded-lg flex justify-center items-center border-gray-400">
                    
                            <div className='p-4 '>
                            <p className="flex justify-center font-semibold">{prop.firstname}</p>
                                <img src={prop.image} className='h-[15em]' alt="reloading page"/>
                                <br/>
    
                                <div className='flex justify-between py-1'>
                                <p>Place : {prop.place}</p>
                                <p>Area : {prop.area}</p>
                                </div>
    
                                <div className="flex justify-between py-1">
                                <p>{prop.bedrooms} bedrooms</p>
                                <p>{prop.bathrooms} bathrooms</p>
                                </div>
    
                                <div className="flex justify-between py-1">
                                <p ><b>College: </b>{prop.college}</p>
                                <p ><b>Hospital: </b>{prop.hospital}</p>
                                <p ><b>Market: </b>{prop.market}</p>
                                </div>
                                <br/>
                                <hr className='border border-t-2 border-gray-400 border-dotted'/>
                                <br/>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
                </div>
        </>
    );
}

export default SellerDetails;
