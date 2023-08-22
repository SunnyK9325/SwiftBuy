import React from "react";
import "./Home.scss";
import Slider from "../../components/Slider/Slider.jsx";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts.jsx";
import Categories from "../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";

const Home = () => {
    return <div className="home">
        <Slider />
        <FeaturedProducts type="featured"/>
        <Categories />
        <FeaturedProducts type="trending"/>
        <Contact />
    </div>
}

export default Home;