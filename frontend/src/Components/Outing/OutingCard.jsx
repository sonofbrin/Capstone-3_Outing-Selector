import React from "react";

export default function OutingCard(props) {
    return (
        <div className="outing-card" onClick={props.clickHandler}>
            <h4 className="outing-card--detail">Scheduled Time:<br />{props.outing.dateTime}</h4>
            <h4 className="outing-card--detail">Decision Due Date:<br />{props.outing.decisionTime}</h4>
        </div>
    )
}