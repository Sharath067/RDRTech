import React, {useState, useEffect, useRef} from 'react';
import {
  // FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCog,
  // FaRetweet,
  // FaShoppingBag,
  FaTicketAlt,
} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import './Sidebar.css';
import subscription from '../../Assets/Images/subscription.png';

const Sidebar = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const sidebarRef = useRef(null);
  // Close on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth <= 768 && // mobile condition
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };
  const menuItem = [
    {
      path: 'dashboard',
      name: 'Dashboard',
      icon: <FaUserAlt />,
    },
    {
      path: 'customers',
      name: 'Customers',
      icon: <FaRegChartBar />,
    },
    {
      path: 'Coupons',
      name: 'Coupons',
      icon: <FaTicketAlt />,
    },
    {
      path: 'subscription',
      name: 'Subscription',
      icon: (
        <img
          src={subscription}
          alt="subscribe-icon"
          width="20px"
          height="20px"
        />
      ),
    },
    {
      path: 'settings',
      name: 'Settings',
      icon: <FaCog />,
    },
  ];

  return (
    <div className="container-1">
      <div style={{width: isOpen ? '200px' : '50px'}} className="sidebar">
        <div className="top_section">
          <div className="logo">
            <h1 style={{display: isOpen ? 'block' : 'none'}}>RDRTECH</h1>
          </div>
          <div style={{marginLeft: isOpen ? '50px' : '0px'}} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassname="active"
            onClick={handleMenuClick}>
            <div className="icon">{item.icon}</div>
            <div
              style={{display: isOpen ? 'block' : 'none'}}
              className="link_text">
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
