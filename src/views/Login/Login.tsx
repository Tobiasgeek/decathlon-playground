import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputLabel from '@material-ui/core/InputLabel'
// core components
import GridItem from '../../components/Grid/GridItem'
import GridContainer from '../../components/Grid/GridContainer'
import CustomInput from '../../components/CustomInput/CustomInput'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'
import CardHeader from '../../components/Card/CardHeader'
import CardAvatar from '../../components/Card/CardAvatar'
import CardBody from '../../components/Card/CardBody'
import CardFooter from '../../components/Card/CardFooter'

import { createStyles, Typography } from '@material-ui/core'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

import { APIService } from '../../services/api'

const api = new APIService()

const styles = createStyles({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 300,
    fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
    marginBottom: '3px',
    textDecoration: 'none'
  }
});

interface Props extends RouteComponentProps {
  classes: any;
  history: any;
  location: any;
  match: any;
}

interface State {
  email:{
    value:string,
    error:boolean,
    errorMessage:any,
    success:boolean
  },
  password:{
    value:string,
    error:boolean,
    errorMessage:any,
    success:boolean
  }
}

class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      email:{
        value: "",
        error: false,
        errorMessage: "",
        success: false
      },
      password:{
        value: "",
        error: false,
        errorMessage: "",
        success: false
      }
    }
  }
  
  handleSubmit = (e:any) => {
    e.preventDefault();
    // console.log('handleSubmit', e)
    if(this.state.email.success && this.state.password.success){
      api.login(this.state.email.value, this.state.password.value).then((ret)=>{
        console.log("handleSubmit", ret)
        this.props.history.push("/admin")
      }).catch((err)=>{
        console.error("handleSubmit", err)
        if(err.code == "NotAuthorizedException"){
          let _state = this.state
          _state.password.error = true
          _state.password.errorMessage = "Incorrect Password"
          _state.password.success = false
          this.setState(_state)
        }
      })
    }else{
      let _state = this.state
      _state.email.error = !this.state.email.success
      _state.email.errorMessage = _state.email.value==""?"Must be filled":"Incorrect format"

      _state.password.error = !this.state.password.success
      this.setState(_state)
    }
  }

  onTextChange = (key:any, e:any)=>{
    e.preventDefault()
    let _state:any = {}, val = e.currentTarget.value || "", valid = val != "", errorMessage=undefined
    errorMessage = "Must be filled"
    _state[key] = {
      value: val,
      error: !valid,
      errorMessage: valid?undefined:errorMessage,
      success: valid
    }
    this.setState(_state)
  }

  render(){
    const { classes } = this.props;
    return (
      <GridContainer justify={"center"} alignContent={"center"} style={{height:'100%'}}>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <form onSubmit={this.handleSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Login</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Email address"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange:(e:any)=>{ this.onTextChange("email", e) },
                        onBlur:(e:any)=>{ this.onTextChange("email", e) }
                      }}
                      error={this.state.email.error}
                      success={this.state.email.success}
                      helperText={this.state.email.errorMessage}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type:"password",
                        onChange:(e:any)=>{ this.onTextChange("password", e) },
                        onBlur:(e:any)=>{ this.onTextChange("password", e) }
                      }}
                      error={this.state.password.error}
                      success={this.state.password.success}
                      helperText={this.state.password.errorMessage}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <Button color="primary" type="submit">Login</Button>
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}

export default withStyles(styles)(withRouter(Login));
