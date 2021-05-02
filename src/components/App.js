import React from 'react';
import Header from './ui/Header'
import {ThemeProvider} from '@material-ui/styles'
import theme from './ui/Theme'
import {BrowserRouter, Route, Switch} from "react-router-dom"

function App() {
  return (
    // theme is a prop
    <ThemeProvider theme={theme}> 
    <BrowserRouter>
    <Header />
    <Switch> 
    {/* default to true, ensures that this route will only render unless the exact url is provided*/}
    <Route exact={true} path="/" component={()=> <div>Home</div>}/>
    <Route exact={true} path="/api" component={() => <div>Api</div>} />
    <Route exact={true} path="/moreinfo" component={() => <div>More Info</div>}/>
    </Switch>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
