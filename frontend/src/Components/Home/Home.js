import React from "react";
import RestaurantCard from "./RestaurantCard";
import HeroBanner from "./HeroBanner/HeroBanner";
import axios from "axios";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { baseUrl } from "../../Shared/baseUrl";
import RestaurantDetail from "./RestaurantDetail";
import './home.css'

function Home(props) {

  const [searchLocation, setSearchLocation] = React.useState('');
  const [restaurants, setRestaurants] = React.useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(null);

  function handleSearch(event) {
    event.preventDefault();

    const searchParams = {params: {location: searchLocation}}

    axios.get(baseUrl + '/restaurant/search', searchParams)
      .then( response => {
        console.log(response.data)
        setRestaurants(response.data)
      })
  }

  function handleInputChange(event) {
    event.preventDefault();
    setSearchLocation(() => event.target.value)
  }

  function showDetail(id) {
    //Bring Restaurant Into Focus
    console.log("Clicked restaurant id: " + id);
    setSelectedRestaurant(restaurants.find( restaurant => {
      return restaurant.id === id;
    }))
  }

  function deselectRestaurant() {
    setSelectedRestaurant(null);
  }

  const restaurantElements = restaurants.map((restaurant) => {
    return (
      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
        clickHandler={() => showDetail(restaurant.id)}
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
          <Button color="primary" type="submit" onClick={handleSearch}>Search</Button>
        </Form>
      </div>
      <div className="restaurant-card-container">
        {restaurantElements}
      </div>
      <div className="restaurant-detail">
        {selectedRestaurant !== null && <RestaurantDetail restaurant={selectedRestaurant} unfocusHandler={deselectRestaurant} />}
      </div>
    </div>
  );
}

export default Home;
