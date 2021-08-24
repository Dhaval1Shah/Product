import React from 'react';
import { Route, Redirect } from "react-router-dom";
import ls from "local-storage";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  const role = ls('roles');
  const thisPath = path;
  return (
    <Route {...rest} render={
      props => {
        if (role === 'Super Admin') {
          if (thisPath === '/permission' || thisPath === '/role' || thisPath === '/users' || thisPath === '/users/edit/:id' || thisPath === '/users/add' || thisPath === '/leaves' || thisPath === '/leaves/add' || thisPath === '/leaves/edit/:id' || thisPath === '/tickets' || thisPath === '/tickets/add' || thisPath === '/tickets/edit/:id' || thisPath === '/profile' || thisPath === '/event' || thisPath === '/event/add' || thisPath === '/event/edit/:id' || thisPath === '/upcoming' || thisPath === '/upcoming/add' || thisPath === '/upcoming/edit/:id' || thisPath === '/job' || thisPath === '/job/add' || thisPath === '/job/edit/:id' || thisPath === '/qulification' || thisPath === '/qulification/add' || thisPath === '/qulification/edit/:id' || thisPath === '/experience' || thisPath === '/experience/add' || thisPath === '/experience/edit/:id' || thisPath === '/time') {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                path: '/login',
                location: props.location
              }
            } />
          }
        } else if (role === 'Hr') {
          if (thisPath === '/tickets' || thisPath === '/tickets/add' || thisPath === '/tickets/edit/:id' || thisPath === '/profile' || thisPath === '/profile/edit' || thisPath === '/event' || thisPath === '/event/add' || thisPath === '/event/edit/:id' || thisPath === '/show/:id' || thisPath === '/upcoming' || thisPath === '/upcoming/add' || thisPath === '/upcoming/edit/:id' || thisPath === '/job' || thisPath === '/job/add' || thisPath === '/job/edit/:id' || thisPath === '/qulification' || thisPath === '/qulification/add' || thisPath === '/qulification/edit/:id' || thisPath === '/experience' || thisPath === '/experience/add' || thisPath === '/experience/edit/:id' || thisPath === '/time') {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                path: '/login',
                location: props.location
              }
            } />
          }
        } else if (role === 'Admin') {
          if (thisPath === '/permission' || thisPath === '/role' || thisPath === '/users' || thisPath === '/users/edit/:id' || thisPath === '/users/add' || thisPath === '/leaves' || thisPath === '/leaves/add' || thisPath === '/leaves/edit/:id' || thisPath === '/tickets' || thisPath === '/tickets/add' || thisPath === '/tickets/edit/:id' || thisPath === '/profile' || thisPath === '/event' || thisPath === '/event/add' || thisPath === '/event/edit/:id' || thisPath === '/show/:id' || thisPath === '/upcoming' || thisPath === '/upcoming/add' || thisPath === '/upcoming/edit/:id' || thisPath === '/job' || thisPath === '/job/add' || thisPath === '/job/edit/:id' || thisPath === '/qulification' || thisPath === '/qulification/add' || thisPath === '/qulification/edit/:id' || thisPath === '/experience' || thisPath === '/experience/add' || thisPath === '/experience/edit/:id' || thisPath === '/time' || thisPath === '/check') {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                path: '/login',
                location: props.location
              }
            } />
          }
        } else if (role === 'Administrator') {
          if (thisPath === '/permission' || thisPath === '/role' || thisPath === '/users' || thisPath === '/users/edit/:id' || thisPath === '/users/add' || thisPath === '/leaves' || thisPath === '/leaves/add' || thisPath === '/leaves/edit/:id' || thisPath === '/tickets' || thisPath === '/tickets/add' || thisPath === '/tickets/edit/:id' || thisPath === '/profile' || thisPath === '/event' || thisPath === '/event/add' || thisPath === '/event/edit/:id' || thisPath === '/show/:id' || thisPath === '/upcoming' || thisPath === '/upcoming/add' || thisPath === '/upcoming/edit/:id' || thisPath === '/job' || thisPath === '/job/add' || thisPath === '/job/edit/:id' || thisPath === '/qulification' || thisPath === '/qulification/add' || thisPath === '/qulification/edit/:id' || thisPath === '/experience' || thisPath === '/experience/add' || thisPath === '/experience/edit/:id' || thisPath === '/time') {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                path: '/login',
                location: props.location
              }
            } />
          }
        } else {
          return <Redirect to={
            {
              path: '/login',
              location: props.location
            }
          } />
        }
      }
    } />
  )
}
export default ProtectedRoute;



