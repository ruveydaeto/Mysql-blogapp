import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/navbar.css";
import logo from "../img/ruveyda.svg";
import { Popover, MenuItem, IconButton, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img href="/" alt="" src={logo} />
          <Link className="logo-link" href="/" >WELCOME TO MY BLOG APP!</Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <Typography variant="h6" component="span">
            {currentUser?.username}
          </Typography>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={id}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {currentUser ? (
              <MenuItem onClick={() => { logout(); handleClose(); }}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleClose}>
                <Link className="link" to="/login">
                  Login
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={handleClose}>
              <Link className="link" to="/write">
                Write
              </Link>
            </MenuItem>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;