import React from "react";
import { Button } from "reactstrap";

export default function OutingDetail(props) {

    function isBeforeDeadline() {
        const currentDateTime = new Date();
        const deadline = new Date(props.outing.decisionTime)
        return deadline > currentDateTime;
    }

    return (
        <div className="outing-detail">
            <div>
                <h1>Scheduled Time: {props.outing.dateTime}</h1>
                <h1>Decision Cutoff Time: {props.outing.decisionTime}</h1>
            </div>
            <h1>Top Voted</h1>
            <div>
                Under Construction
            </div>
            <p></p>
        </div>
    )
}