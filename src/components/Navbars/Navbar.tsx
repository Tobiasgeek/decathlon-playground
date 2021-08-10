import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import AdminNavbarLinks from './AdminNavbarLinks';

import headerStyle from '../../assets/jss/material-dashboard-react/components/headerStyle';
import { Typography } from '@material-ui/core';

function Header({ ...props }: any) {
  function makeBrand() {
    var name = ""
    // props.routes.map((route: any, key: any) => {
    //   if(route.path.search(":")>-1){
    //     if (props.location.pathname.search(route.layout + (route.path.split(":")[0]))>-1 ) {
    //       name = props.rtlActive ? route.rtlName : route.name
    //       let id = props.location.pathname.replace((route.layout + route.path.split(":")[0]), "")
    //       name += " - "+id
    //     }
    //   }else{
    //     if (route.layout + route.path === props.location.pathname) {
    //       name = props.rtlActive ? route.rtlName : route.name;
    //     }
    //   }
    //   return null
    // })
    return name
  }

  const { classes, color } = props
  const appBarClasses = classNames({
    [' ' + classes[color]]: color
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Typography variant="h5" className={classes.pageTitle}>{makeBrand()}</Typography>
        </div>
        <Hidden smDown={true} implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        <Hidden mdUp={true} implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
// };

export default withStyles(headerStyle)(Header);
