import React from 'react';
import { Route, Redirect } from "react-router-dom";
import ls from "local-storage";

const ProtectedRoute = ({ component: Component,  path, ...rest }) => {
  const role=ls('roles');
  const thisPath=path;
  console.log(role)
  return (
    <Route {...rest} render={
      props => {
        if(role === 'Super Admin'){
          if(thisPath === '/permission' || thisPath === '/role' || thisPath === '/users' || thisPath === '/users/edit/:id' || thisPath === '/users/add' || thisPath === '/leaves' || thisPath === '/leaves/add' || thisPath === '/leaves/edit/:id'  || thisPath === '/tickets'  || thisPath === '/tickets/add'  || thisPath === '/tickets/edit/:id' ){
            return <Component {...rest} {...props} />
          }else {
            return <Redirect to={
              {
                path: '/login',
                location:props.location
              }
            } />
          }
        }else if(role === 'Hr'){
          if(thisPath === '/tickets'  || thisPath === '/tickets/add'  || thisPath === '/tickets/edit/:id' ){
            return <Component {...rest} {...props} />
          }else {
            return <Redirect to={
              {
                path: '/login',
                location:props.location
              }
            } />
          }
        }else if(role === 'Admin'){
          if(thisPath === '/permission' || thisPath === '/role' || thisPath === '/users' || thisPath === '/users/edit/:id' || thisPath === '/users/add' || thisPath === '/leaves' || thisPath === '/leaves/add' || thisPath === '/leaves/edit/:id'  || thisPath === '/tickets'  || thisPath === '/tickets/add'  || thisPath === '/tickets/edit/:id' ){
            return <Component {...rest} {...props} />
          }else {
            return <Redirect to={
              {
                path: '/login',
                location:props.location
              }
            } />
          }
        }else if(role === 'Administrator'){
          if(thisPath === '/permission' || thisPath === '/role' || thisPath === '/users' || thisPath === '/users/edit/:id' || thisPath === '/users/add' || thisPath === '/leaves' || thisPath === '/leaves/add' || thisPath === '/leaves/edit/:id'  || thisPath === '/tickets'  || thisPath === '/tickets/add'  || thisPath === '/tickets/edit/:id' ){
            return <Component {...rest} {...props} />
          }else {
            return <Redirect to={
              {
                path: '/login',
                location:props.location
              }
            } />
          }
        }else {
          return <Redirect to={
            {
              path: '/login',
              location:props.location
            }
          } />
        }
      }
    } />
  )
}
export default ProtectedRoute;



