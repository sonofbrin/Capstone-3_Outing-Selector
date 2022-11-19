import React from "react";
import { Button, Card, CardImg, CardText, CardTitle } from "reactstrap";

function RestaurantDetail(props) {
    return (
        <Card>
            <CardImg src={props.restaurant.imgUrl} alt={props.restaurant.name}/>
            <CardTitle>{props.restaurant.name}</CardTitle>
            <CardText>{props.restaurant.address}</CardText>
            <CardText>{props.restaurant.city + ', ' + props.restaurant.state}</CardText>
            <CardText>{props.restaurant.zip}</CardText>
            <Button onClick={console.log('Under Construction')}>Invite</Button>
            <Button onClick={props.unfocusHandler}>Close</Button>
        </Card>
    )
}

export default RestaurantDetail