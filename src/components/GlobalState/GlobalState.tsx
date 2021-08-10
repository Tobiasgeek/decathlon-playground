import { Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../services/hooks'
import {
  updateStatus,
  updateUser,
  updateNotifications,
  getUser,
  getNotifications
} from '../../reducers/stateSlice'

export function GlobalState() {
  const user:any = useAppSelector(getUser)
  const notifications:any[] = useAppSelector(getNotifications)
  const dispatch = useAppDispatch()

  const setStatus = (data:any) => {
    dispatch(updateStatus(data))
  }

  const setUser = (data:any) => {
    dispatch(updateUser(data))
  }

  const setNotifications = (data:any) => {
    dispatch(updateNotifications(data))
  }

  return (
    <div>
      <div>
        {user?
        <div>
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="body1">{user.firstname}</Typography>
          <Typography variant="body1">{user.lastname}</Typography>
          <Typography variant="body1">{user._id}</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="body1">{user.isAdmin.toString()}</Typography>
        </div>
        :null}
        {notifications.map( (item:any, index:number, list:any[]) => 
          <div>
            <Typography variant="body1">{item.name}</Typography>
            <Typography variant="body1">{item.date}</Typography>
          </div>
        )}
      </div>
      <div>
        <Button color="primary" onClick={ () => setStatus("Updating") }>
          Update Status
        </Button>
        <Button color="primary" onClick={ () => setUser({name:"User",_id:"1234",firstname:"Toby",lastname:"Ho",email:"toby.ho@aladdin.dev",isAdmin:true}) }>
          Update User
        </Button>
        <Button color="primary" onClick={ () => setNotifications([{name:"lala",date:(new Date()).toISOString()}]) }>
          Update Notification
        </Button>
      </div>
    </div>
  )
}
