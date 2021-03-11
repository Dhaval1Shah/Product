import React, { Component } from "react";
import PropTypes from 'prop-types';
import moment, { min } from 'moment';
import AuthApi from './../Services/Authapi';
import LoadderButton from '../Layouts/LoadderButton';
import Grid from '@material-ui/core/Grid';
import ls from "local-storage";

export default class CountdownTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: parseInt(props.count, 10),
            min: 0,
            sec: 0,
            startTime: this.props.startTime,
            stopTime: this.props.stopTime,
        };


        if (this.props.timerOn === false) {
            this.scnd();
        }

    }

    // componentWillUnmount() {
    //     this.props.updateCounter(this.state.count);
    //     // this.unlisten();
    // }

    // componentWillMount() {
    //     this.unlisten = this.props.history.listen((location, action) => { });
    // }

    // handleCountdown = seconds => {
    //     this.setState({
    //         count: seconds,
    //     });
    //     console.log(this.state.count);
    // };

    scnd = async () => {
        let timeCount = await AuthApi.durTime();
        // console.log(timeCount);
        this.props.updateCounterOnload(parseInt(timeCount.totalDurationInSec));     
    }



    format = time => {

        const {
            border,
            showTitle,
            direction,
            noPoints,
            color,
            backgroundColor,
            responsive,
            size,
            hideDay,
            hideHours,
            dayTitle,
            hourTitle,
            minuteTitle,
            secondTitle,
            labelSize,
        } = this.props;

        let seconds = time % 60;
        let minutes = Math.floor(time / 60) % 60;
        let hours = Math.floor(time / 3600) % 24;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        hours = hours < 10 ? `0${hours}` : hours;
        // if(this.props.startTime && this.props.startTime > 0){
        //     let startTime = Date.now() - this.props.startTime;
        //     minutes = ("0" + (Math.floor(startTime / 60000) % 60)).slice(-2);
        //     hours = ("0" + Math.floor(startTime / 3600000)).slice(-2);
        // }

        if (showTitle) {
            const borderClass = border ? 'border' : '';
            const responsiveClass = responsive ? 'responsive' : '';
            const classBox = `countBox ${direction}`;
            return (
                <div style={{ fontSize: '20px' }} className={`${classBox} ${borderClass} ${responsiveClass}`}>
                    <div className="countBoxItem">
                        <div style={{ fontSize: `${labelSize}px` }} className={"label"}>{secondTitle}</div>
                        <div className={"count"} style={{ color, backgroundColor }}>
                            {seconds}
                        </div>
                    </div>
                    {!noPoints && <span className={"split"}>:</span>}
                    <div className={"countBoxItem"}>
                        <div style={{ fontSize: `${labelSize}px` }} className={"label"}>{minuteTitle}</div>
                        <div className={"count"} style={{ color, backgroundColor }}>
                            {minutes}
                        </div>
                    </div>
                    {!hideHours && !noPoints && <span className={"split"}>:</span>}
                    {!hideHours && (
                        <div className={"countBoxItem"}>
                            <div style={{ fontSize: `${labelSize}px` }} className={"label"}>{hourTitle}</div>
                            <div className={"count"} style={{ color, backgroundColor }}>
                                {hours}
                            </div>
                        </div>
                    )}

                </div>
            )
        }


        const borderClass = border ? 'border' : '';
        const responsiveClass = responsive ? 'responsive' : '';
        const classBox = `inline ${direction}`;
        return (
            <div style={{ fontSize: '100px' }} className={`${classBox} ${borderClass} ${responsiveClass}`}>
                {!hideHours && (
                    <span className={"count"} style={{ color, backgroundColor }}>
                        {hours}
                    </span>
                )}
                {!hideHours && !noPoints && <span className={"split"}>:</span>}
                <span className={"count"} style={{ color, backgroundColor }}>
                    {minutes}
                </span>
                {!noPoints && <span className={"split"}>:</span>}
                <span className={"count"} style={{ color, backgroundColor }}>
                    {seconds}
                </span>
            </div>
        );
    };

    render() {
        const { count } = this.props;
        const { className, id } = this.props;
        return (
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <div className="displayedTime">{this.format(count)}</div>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid xs={2}>
                    {this.props.timerOn === false && (
                        <LoadderButton onClickFn={this.props.startTimer} btnText="In" />
                    )}
                    {this.props.timerOn !== false && (
                        <LoadderButton onClickFn={this.props.stopTimer} btnText="Out" />
                    )}
                </Grid>
                <Grid item xs={5}></Grid>
            </Grid>
        );
    }
}

CountdownTimer.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    count: PropTypes.number,
    border: PropTypes.bool,
    showTitle: PropTypes.bool,
    direction: PropTypes.oneOf(['right', 'left']),
    noPoints: PropTypes.bool,
    responsive: PropTypes.bool,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    size: PropTypes.number,
    labelSize: PropTypes.number,
    hideDay: PropTypes.bool,
    hideHours: PropTypes.bool,
    dayTitle: PropTypes.string,
    hourTitle: PropTypes.string,
    minuteTitle: PropTypes.string,
    secondTitle: PropTypes.string,
    onEnd: PropTypes.func,
};

CountdownTimer.defaultProps = {
    count: 0,
    border: false,
    showTitle: false,
    direction: 'left',
    noPoints: false,
    color: '#000',
    backgroundColor: '#fff',
    responsive: false,
    size: 18,
    labelSize: 12,
    hideDay: false,
    hideHours: false,
    dayTitle: 'Day',
    hourTitle: 'Hour',
    minuteTitle: 'Min',
    secondTitle: 'Sec',
    className: '',
    id: '',
    onEnd: () => { },
};