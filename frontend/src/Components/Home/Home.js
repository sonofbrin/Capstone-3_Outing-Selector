import React from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import HeroBanner from "./HeroBanner/HeroBanner";
import yelp from "./yelpAPI";

function Home(props) {
  const [restaurants, setRestaurants] = React.useState([yelp]);

  function searchRestaurants(search) {}

  function showDetail(id) {
    //Bring Restaurant Into Focus
    console.log("Clicked restaurant id: " + id);
  }

  const restaurantElements = yelp.map((restaurant) => {
    return (
      <RestaurantCard
        key={restaurant.id}
        imageUrl={restaurant.image_url}
        name={restaurant.name}
        clickHandler={() => showDetail(restaurant.id)}
      />
    );
  });

  return (
    <div className="home-container">
      <div className="hero-banner">
        {/* <HeroBanner /> */}
      </div>
      <div className="search">Search</div>
      <div className="restaurant-card-container">{restaurantElements}</div>
    </div>
  );
}

export default Home;
