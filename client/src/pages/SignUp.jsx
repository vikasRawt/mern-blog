import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

function SignUp() {
  const [formData, setFormdata] = useState({});
  const handleChange = (e) => {
    // what formdata is doing is it stores the value and then keeps eye on the changes and then storing others by spreading the elements and all.
    setFormdata({ ...formData, [e.target.id]: e.target.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await axios.post('/api/auth/signup',{
    //     body:JSON.stringify(formData),
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //   });

    // } catch (error) {
    //   console.log("eRROR",error)
    // }

    try {
      const res = await fetch("http://localhost:4001/api/auth/signup", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    } catch (error) {}
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
                id="Email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="Password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account</span>
            <Link to="/" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
