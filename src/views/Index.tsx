/* eslint-disable */
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';

// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import Login from './Login/Login';

interface Props {
  classes: any;
  location: any;
}

interface State {
  mobileOpen: boolean;
}

class Container extends React.Component<Props, State> {
  refs: any;
  constructor(props: Props) {
    super(props)
    this.state = {
      mobileOpen: false
    }
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeFunction);
  }

  componentDidUpdate(e: any) {
    if (e.history.location.pathname !== e.location.pathname) {
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
        <div style={{width:'100%',height:'100%'}}>
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect exact from="/" to="/login"/>
          </Switch>
        </div>
    );
  }
}

export default Container
