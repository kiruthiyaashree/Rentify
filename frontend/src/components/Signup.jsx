import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [signupFormData, setSignupFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    usertype: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const validateEmail = (text) => {
    if (!text || typeof text !== 'string') {
      return false;
    }

    const index = text.indexOf('@');
    if (index > 0 && index < text.length - 1) {
      const validStringForEmail = text.slice(index);
      return validStringForEmail.endsWith('@gmail.com');
    }

    return false;
  };

  const validatePassword = (text) => {
    return text.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(signupFormData.email)) {
      if (signupFormData.password === signupFormData.confirm_password) {
        if (validatePassword(signupFormData.password)) {
          try {
            const response = await axios.post("http://localhost:6700/signup", signupFormData);
            if (response.data.message === 'Email already exists') {
              toast.warning(response.data.message);
              setSignupFormData(prevData => ({
                ...prevData,
                email: '',
              }));
            } else {
              toast.success(`${signupFormData.firstname} signed up successfully!`);
              setSignupFormData({
                firstname: '',
                lastname: '',
                email: '',
                phonenumber: '',
                usertype: '',
                password: '',
                confirm_password: '',
              });
              navigate("/");
            }
          } catch (error) {
            console.error("Error in signing up", error);
            toast.error("Error occurred during signup");
          }
        } else {
          toast.warning('Password should contain at least 8 - 15 characters, 1 special character, 1 digit, and 1 uppercase!');
        }
      } else {
        toast.warning('Passwords do not match');
      }
    } else {
      toast.warning('Email is invalid');
    }
  };
  

  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="">
      <form className="flex justify-center items-center min-h-[100vh]" onSubmit={handleSubmit}>
        <fieldset className="border border-black w-fit px-20 py-12 rounded-xl">
          <h2 className="text-2xl text-center font-bold mb-4">Signup</h2>
          <input type="text" className="border border-black p-3 rounded-md my-3" placeholder="First name" id="firstname" name="firstname" value={signupFormData.firstname} onChange={handleChange} />
          <br />
          <input type="text" className="border border-black p-3 rounded-md my-3" placeholder="Last name" id="lastname" name="lastname" value={signupFormData.lastname} onChange={handleChange} />
          <br />
          <input type="text" className="border border-black p-3 rounded-md my-3" placeholder="Email" id="email" name="email" value={signupFormData.email} onChange={handleChange} />
          <br />
          <input type="text" className="border border-black p-3 rounded-md my-3" placeholder="Phone number" id="phonenumber" name="phonenumber" value={signupFormData.phonenumber} onChange={handleChange} />
          <br />
          <select className="border border-black p-3 rounded-md my-3" name="usertype" value={signupFormData.usertype} onChange={handleChange} required>
            <option value="" disabled>Select an option</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          <br />
          <input type={isShowPassword ? 'text' : 'password'} className="border border-black p-3 rounded-md my-3" placeholder="Password" id="password" name="password" value={signupFormData.password} onChange={handleChange} />
          <br />
          <input type={isShowPassword ? 'text' : 'password'} className="border border-black p-3 rounded-md my-3" placeholder="Confirm password" id="confirm_password" name="confirm_password" value={signupFormData.confirm_password} onChange={handleChange} />
          <br />
          <input type="checkbox" id="showPassword" className="mr-1" onChange={() => setIsShowPassword(!isShowPassword)} />Show Password
          <br />
          <div className="flex justify-center my-3">
            <button type="submit" className="px-8 py-2 border border-black rounded-xl bg-blue-800 text-white hover:border-b-2 hover:border-r-2">Signup</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup
