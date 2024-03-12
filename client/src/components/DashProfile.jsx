import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  // console.log(currentUser.data);

  const [image, setImage] = useState(null);

  const [imageFileUrl, setImageFileUrl] = useState(null); //for changing the file we getting/selscting into url

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);

  const [imageFileUploadError, setimageFileUploadError] = useState(null);

  console.log(imageFileUploadProgress, imageFileUploadError);
  const filePickerRef = useRef();

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e.target.files[0]);
      setImageFileUrl(URL.createObjectURL(file)); //method to create a url for a file, a temporary imageUrl
    }
  };
  // console.log(image, imageFileUrl);

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setimageFileUploadError(
          "couldn't upload the image(file must be less than 2MB"
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer  shadow-md overflow-hidden"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          <img
            src={imageFileUrl || currentUser.data.profilePic}
            alt="user1"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray] "
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.data.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.data.email}
        />
        <TextInput type="password" id="password" placeholder="username" />
        <Button type="password" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer"> Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
