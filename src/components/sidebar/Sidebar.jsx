import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import google from '../../assets/google.png';
import Styles from './Sidebar.module.css';
import {
  FiHome,
  FiUser,
  FiList,
  FiBox,
  FiShoppingCart,
  FiBarChart2,
  FiMail,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem('userToken');
    sessionStorage.clear();

    // Navigate to login page
    navigate('/login');
  };

  const links = [
    { to: '/', label: 'Dashboard', icon: <FiHome /> },
    { to: '/customer', label: 'Customer', icon: <FiUser /> },
    { to: '/orders', label: 'Orders', icon: <FiUser /> },
    { to: '/categories', label: 'Categories', icon: <FiList /> },
    { to: '/products', label: 'Products', icon: <FiBox /> },
    { to: '/payments', label: 'Payments', icon: <FiShoppingCart /> },
    { to: '/analytics', label: 'Analytics', icon: <FiBarChart2 /> },
    { to: '/mails', label: 'Mails', icon: <FiMail /> },
    { to: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <aside
      className={`${Styles.Sidebar} ${isExpanded ? Styles.Expanded : Styles.Collapsed}`}
    >
      <div className={Styles.ToggleButton} onClick={toggleSidebar}>
        {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
      </div>
      <div className={Styles.Brand}>
        <img src={google} alt="Google Store" />
      </div>
      <nav className={Styles.Nav}>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `${Styles.Link} ${isActive ? Styles.Active : ''}`
            }
          >
            <span className={Styles.Icon}>{link.icon}</span>
            {isExpanded && <span className={Styles.Label}>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
      <button className={`${Styles.Logout} ${Styles.LogoutButton}`} onClick={handleLogout}>
        <FiLogOut className={Styles.LogButton} />
        {isExpanded && <div className={Styles.Text}>Logout</div>}
      </button>
    </aside>
  );
};

export default Sidebar;
