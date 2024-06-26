import React, { useContext, useEffect, useState } from "react";
import logo from "/logo2.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { Link, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useAuth();
  const [cart, refetch] = useCart();
  const location = useLocation(); // Get current path

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li className={`${location.pathname === '/' ? 'text-yellow-400' : 'text-white'}`}>
        <Link to="/" className="hover:text-white">Home</Link>
      </li>
      <li className={`${location.pathname === '/menu' ? 'text-yellow-400' : 'text-white'}`}>
        <Link to="/menu" className="hover:text-white">Menu</Link>
      </li>
      <li className={`${location.pathname === '/about-us' ? 'text-yellow-400' : 'text-white'}`}>
        <Link to="/about-us" className="hover:text-white">About Us</Link>
      </li>
      <li className={`${location.pathname === '/contact-us' ? 'text-yellow-400' : 'text-white'}`}>
        <Link to="/contact-us" className="hover:text-white">Contact</Link>
      </li>
    </>
  );
  

  return (
    <header className={`max-w-screen-2xl bg-baby-pink container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}>
      <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-baby-pink transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown justify-between">
            <label tabIndex={0} className="  text-slate-50 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-64 space-y-3">
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src={logo} alt="" className="w-[120px]" />
          </a>
        </div>
        
        {/* Navi items */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-white space-x-1 menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end ">
          {/* shopping cart */}
          {user ?  
            <Link to="/cart-page" className="text-white">
              <label tabIndex={0} className="btn btn-ghost border-none btn-circle  lg:flex items-center justify-center mr-3">
                <div className="indicator text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span className="badge  bg-baby-pink text-white badge-sm indicator-item">{cart.length || 0}</span>
                </div>
              </label>
            </Link>
            : <></>
          }

          {/* login button */}
          { user ? 
            <Profile user={user}/>
            : <button onClick={() => document.getElementById('my_modal_5').showModal()} 
            style={{ backgroundColor: '#ffb6c1', color: 'white' }}
  className="btn flex items-center gap-2 rounded-full px-6 hover:'#ff94b2'">

                <FaRegUser /> Login
              </button>
          }
          <Modal/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
