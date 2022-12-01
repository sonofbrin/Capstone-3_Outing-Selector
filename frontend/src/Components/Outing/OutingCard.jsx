import React from "react";

export default function OutingCard(props) {

    const outingDate = new Date(props.outing.dateTime)

    return (
        <div className="outing-card" onClick={props.clickHandler}>
            <h4 className="outing-card--detail">Outing On:<br />{outingDate.toDateString()}</h4>
            <h4 className="outing-card--detail">At:<br />{outingDate.toTimeString()}</h4>
        </div>
    )
}