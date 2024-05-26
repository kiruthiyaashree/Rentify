import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [signinFormData, setSigninFormData] = useState({
        verify_email: '',
        verify_password: '',
    });
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleChangeSignIn = (e) => {
        const { name, value } = e.target;
        setSigninFormData({ ...signinFormData, [name]: value });
    };

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:6700/login", signinFormData);
            if (response.data.message === "Email not found!" || response.data.message === "Wrong credentials") {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                const firstname = response.data.message.split(" ")[0]; 
                localStorage.setItem('firstname', JSON.stringify(firstname));
                navigate("/");
            }
            setSigninFormData({
                verify_email: '',
                verify_password: '',
            });
        } catch (error) {
            console.log(error);
            toast.error("Error occurred during signing in!");
        }
    };

    return (
        <div>
            <form className="flex justify-center items-center min-h-[100vh]" onSubmit={handleSubmitSignIn}>
                <fieldset className="border border-black w-fit p-32 rounded-xl">
                    <h2 className="text-2xl text-center font-bold mb-4">Signin</h2>
                    <input type="text" className="border border-black p-3 rounded-md my-3" placeholder="Email" id="verify_email" name="verify_email" value={signinFormData.verify_email} onChange={handleChangeSignIn} />
                    <br />
                    <input type={isShowPassword ? 'text' : 'password'} className="border border-black p-3 rounded-md my-3" placeholder="Password" id="verify_password" name="verify_password" value={signinFormData.verify_password} onChange={handleChangeSignIn} />
                    <br />
                    <input type="checkbox" onChange={() => setIsShowPassword(!isShowPassword)} />Show Password
                    <br />
                    <div className="flex justify-center my-3">
                        <button type="submit" className="px-8 py-2 border border-black rounded-xl bg-blue-800 text-white hover:border-b-2 hover:border-r-2">Signin</button>
                    </div>
                    <Link to='/signup' className="underline text-blue-800">User register</Link>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;
