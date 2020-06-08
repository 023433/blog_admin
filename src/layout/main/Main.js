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
        height: "calc(100% - 40px)",
        badge: {
          backgroundColor: "#01579b",
          color: "#ffffff"
        },
        item: {
          backgroundColor: "#ffffff",
          color: "#424242",
          icon: {
            color: "#424242",
          }
        },
        table: {
          header: {
            backgroundColor: "#133a70",
            color: "#ffffff",
          },
          body: {
            backgroundColor: "#ffffff",
            color: "#424242",
          }
        },
        paging: {
          backgroundColor: "#ffffff",
          color: "#424242",
          selected: {
            backgroundColor: "#e0e0e0",
            color: "#212121",
            fontWeight: 700,
          }
        },
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
          color: "#ffffff",
          borderColor: "#01579b",
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
        height: "calc(100% - 40px)",
        badge: {
          backgroundColor: "#2E2E2E",
          color: "#e0e0e0"
        },
        item: {
          backgroundColor: "#757575",
          color: "#bdbdbd",
          icon: {
            color: "#bdbdbd",
          }
        },
        table: {
          header: {
            backgroundColor: "#212121",
            color: "#bdbdbd",
          },
          body: {
            backgroundColor: "#616161",
            color: "#bdbdbd",
            borderColor: "1px solid #424242",
          }
        },
        paging: {
          backgroundColor: "#424242",
          color: "#bdbdbd",
          selected: {
            backgroundColor: "#212121",
            color: "#bdbdbd",
            fontWeight: 700,
          }
        },
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
      paddingLeft: 0,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 64,
      },
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 240,
      },
    },
    content: {
      height: "100%",
      minHeight: "calc(100vh - 64px)",
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

      <div 
        className={classes.root} 
        style={theme === PropertyMenu.Light ? {backgroundColor: "rgb(242, 246, 252)"} :  {backgroundColor: "rgb(21, 21, 21)"}}>

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
