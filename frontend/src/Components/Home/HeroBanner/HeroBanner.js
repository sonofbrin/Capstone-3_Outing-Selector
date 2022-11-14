import React from "react";
import hero from "./hero_banner.jpg"
import "./herobanner.css"

function HeroBanner(){
    return(
        <>
        <img src={hero} alt="Restaurant Dishes" id="herobanner"/>
        </>
    )
}

export default HeroBanner;