import { createMuiTheme } from '@material-ui/core/styles';

const blue = "#2196f3";
const orange = "#ff9100";
const theme = createMuiTheme ({
    palette: {
          common: {
              blue: `${blue}`,
              orange: `${orange}`
          },
          primary: {
              main: `${blue}`
          },
          secondary: {
              main: `${orange}`
          }
      },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",// button is underneath tab so to avoid all caps use none
            // fontWeight: 700,
            fontSize: "1rem",
        },
        button: {
            fontFamily: "Pacifico",
            fontSize: "1rem",
            textTransform: "none",
            color: "white"
        }
        
    }
  });
export default theme