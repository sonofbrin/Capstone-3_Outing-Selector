import React from "react";

export default function OutingDetail(props) {
    return (
        <div>
            <div>
                <h1>Scheduled Time: {props.outing.dateTime}</h1>
                <h1>Decision Cutoff Time: {props.outing.decisionTime}</h1>
            </div>
            <h1>Top Voted</h1>
            <div>
                Under Construction
            </div>
        </div>
    )
}