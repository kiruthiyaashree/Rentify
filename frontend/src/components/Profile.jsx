// Profile.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:6700/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
        <div className='flex justify-center h-[100vh] items-center'>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            </div>
        </>
    );
};
export default Profile;
