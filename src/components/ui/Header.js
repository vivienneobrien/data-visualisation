import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logo from "../network.png";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// different syntax so that we can use our theme inside of our styles
// this is so hello under header
// we say className={class.then whatever is inside of here}
const useStyles = makeStyles((theme) =>
  // object underneath
  ({
    toolbarMargin: {
      // the spread operator copies the whole object of mixins
      ...theme.mixins.toolbar,
      marginBottom: "2em",
    },
    logo: {
      height: "4em",
    },
    logoContainer: {
      padding: "0",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    tabContainer: {
      marginLeft: "auto",
    },
    tab: {
      ...theme.typography.tab,
      minWidth: 14,
      marginLeft: "25px",
      padding: "2rem",
    },
    button: {
      ...theme.typography.button,
      borderRadius: "50px",
      marginLeft: "25px",
      marginRight: "25px",
      height: "45px",
    },
    menu: {
      backgroundColor: theme.palette.common.blue,
      color: "white",
      // borderRadius: "0px" consider changing
    },
    menuItem: {
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover": {
        opacity: 1,
      },
    },
  })
);

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = () => {
  const classes = useStyles();
  // value determines our active tab
  const [value, setValue] = useState(0);
  // stores whatever component we click on and where we want the menu to be rendered
  // eventually this state is going to contain the api drop down tab
  const [anchorEl, setAnchorEl] = useState(null);
  // this will determine the visibility of the menu
  // weather the menu is actually being displayed on the screen of not
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };

  // event contains all of the information about where we just clicked on the screen
  const handleClick = (event) => {
    // current target contains the element we have just clicked on
    // if we pass that to the anchor element that will tell the menu where we want it to be rendered
    setAnchorEl(event.currentTarget);
    // after the menu knows where to render itself, we tell it to be rendered by setting open to true
    setOpen(true);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (event, index) => {
    // setting to null so that the menu goes away
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(index);
  };

  const menuOptions = [
    {
      name: "Api",
      link: "/api"
    },
    {
      name: "Graphs",
      link: "/graphs"
    },
    { name: "Charts", 
      link: "/charts" 
    },
    {
      name: "Networks",
      link: "/networks"
    },
  ];

  useEffect(() => {
    // first check if the path is equal to the route we want to specify
    // we all want to make sure that the correct value is not already set
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/api" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/moreinfo" && value !== 2) {
      setValue(2);
    }
    switch (window.location.pathname) {
      case "/": 
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/api":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);        
        }
        break;
      case "/graphs":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/charts":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case "./networks": 
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      case "/moreinfo":
        if (value !== 2) {
          setValue(2);
        }
        break;
      default:
        break;
    }
  }, [value]);
  // without providing the useeffect hook a list of dependenies this could trigger an infinite chain of updating
  // we are telling the useeffect that we are depending on this value. if the value doesnt change then we dont want to run this code again

  return (
    <React.Fragment>
      {/* we use fragment instead of div because bit faster and has less memory usage (no need to create an extra DOM node */}
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          {/* disableGutters={true} if you wanted logo to go all the way to the left of the appbar*/}
          <Toolbar>
            {/* <Typography variant="h1">
        Data Visualisation</Typography> */}
            <Button
              className={classes.logoContainer}
              component={Link}
              to="/"
              onClick={() => setValue(0)}
              disableRipple
            >
              {/* onClick={() => setValue(0) sets out navigator value back to the home page  */}
              <img alt="MyLogo" src={logo} className={classes.logo} />{" "}
            </Button>
            {/* value is the index of the currently selected tab */}
            <Tabs
              className={classes.tabContainer}
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
            >
              <Tab
                label="Home"
                className={classes.tab}
                component={Link}
                to="/"
              />
              <Tab
                // the aria-owns is going to check if we have an anchor elemnt
                // because if we dont then the anchorEl will be null
                // undefined is the equivalent of not setting the property at all
                // we dont want to set it to an empty string because then it will be misinterpretted as having been left out
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                label="Api"
                onMouseOver={(event) => handleClick(event)}
                className={classes.tab}
                component={Link}
                to="/api"
              />
              <Tab
                label="More Info"
                className={classes.tab}
                component={Link}
                to="/moreinfo"
              />
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Click Me!
            </Button>
            {/* onClose does not need an event passed to it because it is simply setting the state back to null*/}
            {/* MenuListProps={{onMouseLeave}} so when we hover away from the menu, the menu stops showing */}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{ paper: classes.menu }}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
            >
              {/* if u have {} then u need a return statement */}
             {menuOptions.map((option, index) => (
                <MenuItem
                  key={option.name}
                  component={Link}
                  to={option.link}
                  classes={{ root: classes.menuItem }}
                  onClick={(event) => {
                    handleMenuItemClick(event, index);
                    setValue(1);
                    handleClose();
                  }}
                  selected={index === selectedIndex && value === 1}
                >
                  {option.name}
                </MenuItem>
              ))} 
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
