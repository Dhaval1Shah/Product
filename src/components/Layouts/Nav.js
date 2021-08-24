import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FontAwesomeIconComponent from '../Layouts/FontAwesomeIconComponent';
import ListItemText from '@material-ui/core/ListItemText';



const Nav = ({ onClick, primary, title, placement, classes }) => {

  return (
    <Tooltip title={title} placement={placement}>
      <ListItem button onClick={onClick}  >
        <ListItemIcon>
          <FontAwesomeIconComponent classes={classes} colorName="primary" fontSize={"small"} />
        </ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </Tooltip>

  )
}


export default Nav;