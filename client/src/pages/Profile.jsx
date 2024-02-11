import { useSelector } from 'react-redux';
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile_picture"
          className="h-24 w-24 cursor-pointer rounded-full object-cover self-center"
        />
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
