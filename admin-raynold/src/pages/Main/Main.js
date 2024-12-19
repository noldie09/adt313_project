import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('accessToken');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    } else {
      setIsLoggedIn(true);
    }
  }, [accessToken]);

  return (
    <div className='Main'>
      <div className='container'>
        <nav className='navigation'>
          <ul>
            <li>
              <a
                href="/main/dashboard"
                className={`nav-link ${isLoggedIn ? '' : 'disabled'}`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a href='/main/movies' className='nav-link'>Movies</a>
            </li>
            <li>
              <a onClick={handleLogout} className='nav-link logout'>
                Logout
              </a>
            </li>
          </ul>
        </nav>
        <main className='outlet'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Main;
