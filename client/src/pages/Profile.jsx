import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase/firebase.js';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [uploadPercent, setUplaodPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${Math.floor(Math.random() * 10000).toString()}_${image.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUplaodPercent(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          name="picture"
          id="picture"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile_picture"
          className="h-24 w-24 cursor-pointer rounded-full object-cover self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">Error uploading image...</span>
          ) : uploadPercent > 0 && uploadPercent < 100 ? (
            <span className="text-slate-400">Uploading: {uploadPercent}%</span>
          ) : uploadPercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          name="username"
          id="username"
          value={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
          placeholder="username"
        />
        <input
          type="email"
          name="email"
          id="email"
          value={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="password"
          className="bg-slate-100 rounded-lg p-3"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-65">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
