import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { APIService } from "../../services/api";

import dashboardStyle from '../../assets/jss/material-dashboard-react/views/dashboardStyle'
import { withStyles } from "@material-ui/styles";

import Table from '../../components/Table/Table'

const api = new APIService()

const allowedColumns = [ "id", "name", "description", "default_branch", "created_at", "stargazers_count", "watchers_count", "html_url" ]
const tableHeader:string[] = ['ID', 'Name', 'Description', 'Default Branch', 'createdAt', 'Stargazers', 'Watchers', 'Link']
enum TABLEHEADER{
  ID = 0,
  Name = 1,
  Media = 2,
  Description = 3,
  Status = 4,
  Actions = 5
}

interface State {
    repos: any[]
}

interface Props extends RouteComponentProps {
    classes: any;
    history: any;
    location: any;
    match: any;
}

class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            repos:[]
        }
        this.getRepos()
        this.columnClick = this.columnClick.bind(this)
    }

    getRepos(){
        api.getRepos().then((res:any)=>{
            let repos = res.sort((a:any,b:any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            console.log("getRepos", repos)
            this.setState({repos:repos})
        }).catch(err=>console.error(err))
    }

    columnClick(e:any, key:any) {
        console.log("columnClick", e,key)
    }

    render(){
        const { repos } = this.state
        
        let collectionInfo = null
        if(repos){
            let collectionData:any=[]
            repos.map((k:any, i:any, l:any)=>{
                let row:any[] = []
                allowedColumns.map(colname => row.push(k[colname]) )
                collectionData.push(row)
            })
            collectionInfo = <Table onSelectColumn={this.columnClick} tableHeaderColor="primary" tableHead={tableHeader} tableData={collectionData}/>
        }
        return(
            <div>
                <h1>Welcome to homepage</h1>
                {collectionInfo}
            </div>
        );
    }
}

export default withStyles(dashboardStyle)(withRouter(Home));