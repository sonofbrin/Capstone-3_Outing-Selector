import React from "react";
import RestaurantCard from "./RestaurantCard";
import HeroBanner from "./HeroBanner/HeroBanner";
import Invitation from "./Invitation"
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { baseUrl } from "../../Shared/baseUrl";
import RestaurantDetail from "./RestaurantDetail";
import './home.css'

function Home(props) {
  const [searchLocation, setSearchLocation] = React.useState("");
  const [restaurants, setRestaurants] = React.useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [showInvite, setShowInvite] = React.useState(false);

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
    const currentTime = hour + ":" + min + ":00";
    
    return currentTime > open && currentTime < close;
  }

  function showDetail(id) {
    //Bring Restaurant Into Focus
    setSelectedRestaurant(
      restaurants.find(restaurant => {
        // toggle();
        return restaurant.id === id;
      })
    );
    toggle();
  }

  const restaurantElements = restaurants.map(restaurant => {
    return (
      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
        clickHandler={() => showDetail(restaurant.id)}
      />
    );
  });

  function toggleInvite(event) {
    event.preventDefault();
    setShowInvite(prevShow => !prevShow);
  }

  return (
    <div className="home-container">
      {console.log(selectedRestaurant)}
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
          <Button color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>
      <div className="restaurant-card-container">
        {
          restaurants.length > 0 &&
          <Button onClick={toggleInvite}>
            Invite Guests
          </Button>
        }
        {restaurantElements}
      </div>
      <div className="restaurant-detail">
        {
          selectedRestaurant !== null &&
          <RestaurantDetail
            restaurant={selectedRestaurant}
            show={modal}
            toggle={toggle}
            restaurantOpen={isOpen(selectedRestaurant.openTime, selectedRestaurant.closeTime)}
          />
        }
      </div>
      <Invitation 
        show={showInvite}
        toggle={toggleInvite}
      />
    </div>
  );
}

export default Home;
