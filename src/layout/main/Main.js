import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, useMediaQuery } from "@material-ui/core";

import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import MenuContext from "../../context/MenuContext";
import { PropertyMenu } from '../../context/PropertyMenu';

export default function Main(props) {
  const { theme } = useContext(MenuContext);
  const { children } = props;

  const lightTheme = createMuiTheme({
    palette: {
      content: {
        padding: "20px 30px 20px 30px",
        backgroundColor: "rgb(242, 246, 252)",
        color: "#424242",
        height: "calc(100% - 40px)"
      },
      logo: {
        first: {
          fill: "#0F61AA"
        },
        second: {
          fill: "#2F89CC"
        }
      },
      header: {
        backgroundColor: "#133a70",
        icon: {
          color: "#ffffff"
        },
        badge: {
          backgroundColor: "#01579b",
          color: "#ffffff"
        }
      },
      sidebar: {
        backgroundColor: "#ffffff",
        nav: {
          color: "#424242"
        }
      },
      dashboard: {
        card: {
          backgroundColor: "#ffffff",
          color: "#424242",
          icon: {
            color: "#ffffff",
          }
        }
      }
    }
  });

  const darkTheme = createMuiTheme({
    palette: {
      content: {
        padding: "20px 30px 20px 30px",
        backgroundColor: "rgb(21, 21, 21)",
        color: "#bdbdbd",
        height: "calc(100% - 40px)"
      },
      logo: {
        first: {
          fill: "#2E2E2E"
        },
        second: {
          fill: "#606060"
        }
      },
      header: {
        backgroundColor: "#212121",
        icon: {
          color: "#bdbdbd"
        },
        badge: {
          backgroundColor: "#616161",
          color: "#e0e0e0"
        }
      },
      sidebar: {
        backgroundColor: "#212121",
        nav: {
          color: "#bdbdbd"
        }
      },
      dashboard: {
        card: {
          backgroundColor: "#616161",
          color: "#bdbdbd",
          icon: {
            color: "#616161",
          }
        }
      }
    }
  });
  
  const materialTheme = createMuiTheme();


  const useStyles = makeStyles(theme => ({
    root: {
      paddingTop: 56,
      paddingLeft: 0,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
        height: "calc(100vh - 84px)",
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 240,
        height: "calc(100vh - 86px)",
      },
    },
    content: {
      [theme.breakpoints.up('md')]: {
        height: "calc(100vh - 64px)",
      },
    }
  }));

  const classes = useStyles();

  const isDesktop = useMediaQuery(materialTheme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };


  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <ThemeProvider theme={theme === PropertyMenu.Light ? lightTheme : darkTheme}>

      <div className={classes.root}>

        <Header onSidebarOpen={handleSidebarOpen} />

          <Sidebar
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? 'persistent' : 'temporary'}
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
