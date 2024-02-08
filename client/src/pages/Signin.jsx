import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      data.success === false ? setError(true) : setError(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="E-mail"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-65"
        >
          {loading ? <span className="loading loading-dots loading-xs"></span> : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500 hover:text-blue-700">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'Something went wrong'}</p>
    </div>
  );
}
