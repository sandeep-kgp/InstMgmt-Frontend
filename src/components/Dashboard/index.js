import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css';

import { MainContainerComponent, PageFooterComponent, PageHeaderComponent } from '../common'

@inject('appModel', 'userModel')
@observer
export default class Dashboard extends Component {

  componentDidMount(){
    this.props.appModel.fetchUsersData()
  }

  getTableColumns(){
    const { userModel } = this.props
    const user = userModel.getUser();
    const columns = [{
      Header: 'SSO ID',
      accessor: 'id',
    }, {
      Header: 'First Name',
      accessor: 'firstName'
    }, {
      Header: 'LastName',
      accessor: 'lastName',
    }, {
      Header: 'Email',
      accessor: 'email',
    }, {
      id: 'studentDetails',
      Header: 'Student Details',
      accessor: row => 'Student Details',
    }]
    if (user && (user.role === 'ADMIN' || user.role === 'DIRECTOR')){
      columns.push({
        id: 'directorDetails',
        Header: 'Director Details',
        accessor: row => 'Director Details',
      })
    }
    return columns
  }

  render(){
    const columns = this.getTableColumns();
    const data = this.props.appModel.getUsersData();
    console.log('Users Data:', data)
    return (
      <div>
        <PageHeaderComponent title={'DashBoard'} />
        <MainContainerComponent>
          { data && 
            <ReactTable data={data} 
              columns={columns} 
              defaultPageSize={10}
              className="-striped -highlight"
              minRows={0}
              showPagination={false}/>
          }
        </MainContainerComponent>
        <PageFooterComponent />
      </div>
    )
  }
}