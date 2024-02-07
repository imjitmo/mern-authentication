import { Link } from 'react-router-dom';
export default function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-65">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500 hover:text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
