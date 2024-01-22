import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className="bg-slate-600">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
          <Link to="/">
            <h1 className="font-bold">OAuth App</h1>
          </Link>
          <ul className="flex gap-4">
            <Link to="/home">
              <li>Home</li>
            </Link>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/sign-in">
              <li>Sign-in</li>
            </Link>
            <Link to="/sign-up">
              <li>Sign-up</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
