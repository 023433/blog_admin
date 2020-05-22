import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'

export default function Main(props) {

  const { children } = props;

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


  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  
  const useStyles = makeStyles((theme) => ({
    
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>

      <div style={{minHeight: "100vh", background: (theme === 'light' ? lightTheme.bgColor : darkTheme.bgColor)}}>

        <Header 
          toggleTheme={toggleTheme} 
          currentTheme={saveTheme} 
          onSidebarOpen={handleSidebarOpen} />

        <Sidebar
          onClose={handleSidebarClose}
          open={openSidebar}
        />
        
        <main className={classes.content}>
          {children}
        </main>
      </div>
        
    </ThemeProvider>
  );
};

Main.propTypes = {
  children: PropTypes.node
};
