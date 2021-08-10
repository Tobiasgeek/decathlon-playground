import React from 'react';
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';

// core components
import Button from '../CustomButtons/Button';

import headerLinksStyle from '../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import { APIService } from '../../services/api'
import { RouteComponentProps, withRouter } from 'react-router-dom';

const api = new APIService()

interface Props extends RouteComponentProps {
  classes: any;
  history: any;
  location: any;
  updateUser?: any;
}
interface State {
  openNotification: boolean;
  openProfile: boolean;
}

class HeaderLinks extends React.Component<Props, State> {
  anchorEl: any;
  constructor(props: Props) {
    super(props)
    this.state = {
      openNotification: false,
      openProfile: false
    }
  }

  handleToggle = () => {
    this.setState({ openNotification: !this.state.openNotification });
  }
  handleToggleProfile = () => {
    this.setState({ openProfile: !this.state.openProfile });
  }

  handleClose = (event: any) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ openNotification: false });
  }

  logout = () => {
    api.logout()
    this.props.updateUser(undefined)
    this.props.history.push('/login')
  }

  render() {
    const { classes, ...rest } = this.props;
    const { openNotification, openProfile } = this.state;
    return (
      <div>
        <div className={'display-none'}> {/* className={classes.manager}> */}
          <Button
            color={window.innerWidth > 959 ? 'transparent' : 'white'}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={openNotification ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp={true} implementation="css">
              <p  className={classes.linkText}> 
              {/* onClick={this.handleClick} */}
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={openNotification}
            anchorEl={this.anchorEl}
            transition={true}
            disablePortal={true}
            className={
              classNames({ [classes.popperClose]: !openNotification }) +
              ' ' +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                // id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Mike John responded to your email
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        You have 5 new tasks
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        You're now friend with Andrew
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another Notification
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another One
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <div className={classes.manager}>
          <Button
            color={window.innerWidth > 959 ? 'transparent' : 'white'}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Person"
            aria-haspopup="true"
            onClick={this.handleToggleProfile}
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp={true} implementation="css">
              <p className={classes.linkText}>Profile</p>
            </Hidden>
          </Button>
          
          <Poppers
            open={openProfile}
            anchorEl={this.anchorEl}
            transition={true}
            disablePortal={true}
            className={
              classNames({ [classes.popperClose]: !openProfile }) +
              ' ' +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                // id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={this.logout}
                        className={classes.dropdownItem}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks));
