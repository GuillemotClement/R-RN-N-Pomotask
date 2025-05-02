import { Link } from "react-router";

export default function Header() {
  return (
    <header className='navbar shadow px-10'>
      <div className='flex-1'>
        <span>Pomotask</span>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-vertical lg:menu-horizontal rounded-box'>
          <li>
            <Link to={"/login"}>Connexion</Link>
          </li>
          <li>
            <Link to={"/register"}>Inscription</Link>
          </li>
        </ul>
      </div>
      <div className='flex gap-2'>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
