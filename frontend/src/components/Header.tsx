import { Link } from "react-router";
import { useUserStore } from "../stores/userStore";

export default function Header() {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const isAuth = useUserStore((state) => state.isAuthenticated);
  const image = user?.image ?? "https://randomuser.me/api/portraits/lego/1.jpg";

  return (
    <header className='navbar shadow px-10'>
      <div className='flex-1'>
        <span>Pomotask</span>
      </div>
      <div className='flex-none'>
        {isAuth ? (
          <ul className='menu menu-vertical lg:menu-horizontal rounded-box'>
            <li>
              <button className='btn btn-neutral' onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className='menu menu-vertical lg:menu-horizontal rounded-box'>
            <li>
              <Link to={"/login"}>Connexion</Link>
            </li>
            <li>
              <Link to={"/register"}>Inscription</Link>
            </li>
          </ul>
        )}
      </div>
      <div className='flex gap-2'>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img alt='Tailwind CSS Navbar component' src={image} />
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
