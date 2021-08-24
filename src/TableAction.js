import React from 'react'
import FontAwesomeIconComponent from '../src/components/Layouts/FontAwesomeIconComponent';
import IconButton from '@material-ui/core/IconButton';
import ls from "local-storage";


export const Pdfdownload = ({ variant, color, classes, colorName, onClick }) => {



    return (
        <div>
            <IconButton variant={variant} color={color} onClick={onClick} >
                <FontAwesomeIconComponent classes={classes} colorName={colorName} fontSize={"small"} />
            </IconButton>
        </div>

    )
}


{/* <IconButton variant="contained" color="primary">
<FontAwesomeIconComponent classes="fas fa-file-pdf" colorName="primary" fontSize={"small"} />
</IconButton> */}