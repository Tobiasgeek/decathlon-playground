/* eslint-disable */
import React from 'react';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

import dashboardStyle from '../assets/jss/material-dashboard-react/layouts/dashboardStyle';

// import image from '../assets/img/sidebar-2.jpg';
const image = ''
import logo from '../assets/img/reactlogo.png';
import { APIService } from '../services/api';

import EnhancedTable from './EnhancedTable'
const api = new APIService();

interface Props extends RouteComponentProps {
  appState: any;
  addNewTask: any;
  classes: any;
  location: any;
  updateUser: any;
}

interface State {
  image: string;
  color: string;
  hasImage: boolean;
  fixedClasses: string;
  mobileOpen: boolean;
  user:{
    id:string,
    email: string,
    lastName: string,
    firstName: string,
    token: string,
    locale: string
  }
}

class Dashboard extends React.Component<Props, State> {
  refs: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      image: image,
      color: 'blue',
      hasImage: true,
      fixedClasses: 'dropdown show',
      mobileOpen: false,
      user:{
        id:"",
        email: "",
        lastName: "",
        firstName: "",
        token:"",
        locale: ""
      }
    }

    api.getCurrentUser().then((ret:any)=>{
      if(ret){
        let user = this.state.user
        user.email = ret.email
        user.lastName = ret.lastName
        user.firstName = ret.firstName
        user.locale = ret.locale
        user.token = ret.token
        user.id = ret.sub
        this.setState({user})
      }else{
        this.props.history.push('/login')
      }
    }).catch((err)=>{
      console.error("getCurrentUser", err)
      this.props.history.push("/login")
    })

  }
  
  // handleImageClick = (i: string) => {
  //   this.setState({ image: i });
  // }

  handleColorClick = (c: string) => {
    this.setState({ color: c });
  }

  handleFixedClick = () => {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  // getRoute() {
  //   return this.props.location.pathname !== '/admin/maps';
  // }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener('resize', this.resizeFunction);
  }

  componentDidUpdate(e: any) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    const { image, mobileOpen, color, fixedClasses } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref="mainPanel">
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                <Route path="/" component={EnhancedTable} />
                <Redirect exact from="/admin" to="/admin/" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(withRouter((Dashboard)));
