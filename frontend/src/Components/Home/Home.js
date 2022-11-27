import React from "react";
import RestaurantCard from "./RestaurantCard";
import HeroBanner from "./HeroBanner/HeroBanner";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { baseUrl } from "../../Shared/baseUrl";
import RestaurantDetail from "./RestaurantDetail";

function Home(props) {
  const [searchLocation, setSearchLocation] = React.useState("");
  const [restaurants, setRestaurants] = React.useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);
  const date = new Date();

  function handleSearch(event) {
    event.preventDefault();

    const searchParams = { params: { location: searchLocation } };

    axios.get(baseUrl + "/restaurant/search", searchParams).then((response) => {
      setRestaurants(response.data);
    });
  }

  function handleInputChange(event) {
    event.preventDefault();
    setSearchLocation(() => event.target.value);
  }

  function isOpen(open, close) {
    let hour = date.getHours().toString();
    let min = date.getMinutes().toString();
    const currentTime = (hour+":"+min+":00")
    
    if ((currentTime) > open && (currentTime) < close) {
      return "Open Now";
    }else{
      
      return "Closed Now"}
  }

  function showDetail(id) {
    //Bring Restaurant Into Focus
    setSelectedRestaurant(
      restaurants.find((restaurant) => {
        toggle();
        return restaurant.id === id;
      })
    );
  }

  const restaurantElements = restaurants.map((restaurant) => {
    return (
      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
        clickHandler={() => showDetail(restaurant.id) && toggle()}
      />
    );
  });

  return (
    <div className="home-container">
      <div className="hero-banner">
        <HeroBanner />
      </div>
      <div className="search">
        <Form>
          <FormGroup>
            <Input
              type="text"
              id="searchLocation"
              name="searchLocation"
              placeholder="Search by City or Zip"
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button color="primary" type="submit" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>
      <div className="restaurant-card-container">
        {restaurantElements}
        {selectedRestaurant !== null && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            isOpen={modal}
            toggle={toggle}
          />
        )}
      </div>
      <div className="restaurant-detail">
        <div
          style={{
            display: "block",
            width: 700,
            padding: 30,
          }}
        >
          {selectedRestaurant !== null && (
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader>
                {" "}
                <img
                  src={selectedRestaurant.imgUrl}
                  alt={selectedRestaurant.name}
                />
                {selectedRestaurant.name}
              </ModalHeader>
              <ModalBody>{selectedRestaurant.address}</ModalBody>
              <ModalBody>
                {selectedRestaurant.city +
                  ", " +
                  selectedRestaurant.state +
                  ", " +
                  selectedRestaurant.zip}
              </ModalBody>
              <ModalBody>
                {isOpen(selectedRestaurant.openTime,
                selectedRestaurant.closeTime)}
              </ModalBody>
              <Button onClick={console.log(" Under Construction ")}>
                Invite
              </Button>
              <Button onClick={toggle}>Close</Button>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
