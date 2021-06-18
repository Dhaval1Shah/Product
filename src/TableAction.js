import React from 'react'
import FontAwesomeIconComponent from '../src/components/Layouts/FontAwesomeIconComponent';
import IconButton from '@material-ui/core/IconButton';


export const Pdfdownload = (props, row) => {
    return (
        <IconButton variant="contained" color="primary" >
            <FontAwesomeIconComponent classes="fas fa-file-pdf" colorName="primary" fontSize={"small"} />
        </IconButton>
    )
}

