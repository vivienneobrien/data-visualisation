import React, {useState, useEffect} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import logo from "../network.png";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom"

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
        backgroundColor: "transparent"
      }
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
      marginLeft:"25px",
      marginRight: "25px",
      height: "45px"
    }
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
  const [value, setValue] = useState(0)
  const handleChange = (event, value) => {
      setValue(value)
  }
  useEffect(()=>{
    // first check if the path is equal to the route we want to specify
    // we all want to make sure that the correct value is not already set
    if (window.location.pathname === "/" && value !== 0){
      setValue(0)
    } else if (window.location.pathname === "/api" && value !==1){
        setValue(1)
      } else if (window.location.pathname === "/moreinfo" && value!==2){
        setValue(2)
      }
    }
  ,[value]); 
  // without providing the useeffect hook a list of dependenies this could trigger an infinite chain of updating
  // we are telling the useeffect that we are depending on this value. if the value doesnt change then we dont want to run this code again


  return (
    <React.Fragment>
      {/* we use fragment instead of div because bit faster and has less memory usage (no need to create an extra DOM node */}
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          {/* disableGutters={true} if you wanted logo to go all the way to the left of the appbar*/}
          <Toolbar>
            {/* <Typography variant="h3" color="secondary">
        Data Visualisation</Typography> */}
        <Button className={classes.logoContainer}component={Link} to="/" onClick={() => setValue(0)} disableRipple> 
        {/* onClick={() => setValue(0) sets out navigator value back to the home page  */}
            <img alt="MyLogo" src={logo} className={classes.logo} /> </Button>
            {/* value is the index of the currently selected tab */}
            <Tabs className={classes.tabContainer} value={value} onChange={handleChange} indicatorColor="primary">
              <Tab label="Home" className={classes.tab} component={Link} to="/"/>
              <Tab label="Api" className={classes.tab} component={Link} to="api"/>
              <Tab label="More Info" className={classes.tab} component={Link} to="moreinfo"/>
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>Click Me!</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
