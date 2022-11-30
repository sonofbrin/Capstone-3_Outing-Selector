import React from "react";
import { Button, Card, CardImg, CardTitle } from "reactstrap";

function RestaurantCard(props) {
    return (
        <div className="card">
        <Card>
            <CardImg src={props.restaurant.imgUrl} alt={props.restaurant.name} className="card-img"/>
            <CardTitle>{props.restaurant.name}</CardTitle>
            <Button onClick={props.clickHandler} id="detail_button">Details</Button>
        </Card>
        </div>
    )
}

export default RestaurantCard