import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import Header from '../components/header/Header'


export default function Main() {

  let saveTheme = localStorage.getItem("theme")

  if (saveTheme === 'undefined') {
    saveTheme = 'light';
  }

  const [theme, setTheme] = useState(saveTheme);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }

  const lightTheme = createMuiTheme({

  });

  const darkTheme = createMuiTheme({

  });

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>

      <Router>
        <div style={{minHeight: "100vh", background: (theme === 'light' ? lightTheme.bgColor : darkTheme.bgColor)}}>
          <Header toggleTheme={toggleTheme} currentTheme={saveTheme} />
          <ScrollToTop />
          <Switch>
            <Route exact path="/signin">signin</Route>
            <Route path="/write">write</Route>
            <Route path="/*">22</Route>
          </Switch>
        </div>
      </Router>
        
    </ThemeProvider>
  );
}




const ScrollToTop = withRouter(
  ({ history }) => {
    useEffect(() => {
      const unlisten = history.listen(() => {
        window.scrollTo(0, 0);
      });
      return () => {
        unlisten();
      }
    });
  
    return (null);
  }
);