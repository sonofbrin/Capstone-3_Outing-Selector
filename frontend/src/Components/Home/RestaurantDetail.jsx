import React from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from "reactstrap";

function RestaurantDetail(props) {
  return (
    <div style={{
        display: 'block', 
        width: 700, 
        padding: 30
    }}>
      <Modal isOpen={props.show} toggle={props.toggle}>
        <ModalHeader>
          {" "}
          <img src={props.restaurant.imgUrl} alt={props.restaurant.name} />
          {props.restaurant.name}
        </ModalHeader>
        <ModalBody>{props.restaurant.address}</ModalBody>
        <ModalBody>
          {props.restaurant.city +
            ", " +
            props.restaurant.state +
            ", " +
            props.restaurant.zip}
        </ModalBody>
        <ModalBody>
            {props.restaurantOpen ? "Open Now" : "Closed Now"}
        </ModalBody>
        <Button onClick={props.toggle}>Close</Button>
      </Modal>
    </div>
  );
}

export default RestaurantDetail;
