import React from "react";
import { Card, CardImg, CardTitle } from "reactstrap";

function RestaurantCard(props) {
    return (
        <Card onClick={props.clickHandler}>
            <CardImg src={props.imgUrl} alt={props.name}/>
            <CardTitle>{props.name}</CardTitle>
        </Card>
    )
}

export default RestaurantCard