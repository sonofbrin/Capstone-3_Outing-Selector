import React from "react";
import { Card, CardImg, CardText, CardTitle } from "reactstrap";

function RestaurantDetail(props) {
    return (
        <Card>
            <CardImg src={props.imgUrl} alt={props.name}/>
            <CardTitle>{props.name}</CardTitle>
            <CardText>{props.address}</CardText>
            <CardText>{props.city + ', ' + props.state}</CardText>
            <CardText>{props.zip}</CardText>
        </Card>
    )
}

export default RestaurantDetail