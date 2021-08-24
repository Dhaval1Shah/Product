import React from 'react'
import Button from '@material-ui/core/Button';

const Pagenotfound = (props) => {
    return (
        <div calss="flex">
            <h1>404 Error Page #!</h1>
            <p class="zoom-area"><b>make a cool 404 page.</b>  </p>
            <section class="error-container">
                <span>4</span>
                <span><span class="screen-reader-text">0</span></span>
                <span>4</span>
            </section>

            <a button class="more-link" onClick={(e) => { e.preventDefault(); props.history.push('/dashboard') }}>Go back</a>

        </div>

    )
}

export default Pagenotfound;