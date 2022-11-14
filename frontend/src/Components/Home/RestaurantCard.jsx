import React from "react";
import { Button, Card, CardImg, CardTitle } from "reactstrap";

function RestaurantCard(props) {
    return (
        <div className="card">
        <Card>
            <CardImg src={props.imageUrl} alt={props.name}/>
            <CardTitle>{props.name}</CardTitle>
            <Button onClick={props.clickHandler}>Details</Button>
        </Card>
        </div>
    )
}

export default RestaurantCard