import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import G_auth from "../components/G_auth";

export default function SignUp() {
  const [formData, setFormdata] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    // what formdata is doing is it stores the value and then keeps eye on the changes and then storing others by spreading the elements and all.
    setFormdata({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("please fill all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      if (res.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.statusText === "OK"){
        navigate('/sign-in');
      }
    } catch (error) {
      console.error("Error", error);
      console.log("Response data:", error.response.data); // Log the server response
      setErrorMessage(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* leftSide */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Vikas's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a project made to blog my favourites and my life. SignUp and
            blog your life too.
          </p>
        </div>
        {/* rightSide */}
        <div className="flex-1 ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "sign Up"
              )}
            </Button>
            <G_auth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account</span>
            <Link to="/" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
