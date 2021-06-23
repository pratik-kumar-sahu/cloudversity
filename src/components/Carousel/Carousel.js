import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.scss";

export function CarouselFunc() {
  return (
    <Carousel
      className="main"
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      showArrows={false}
      stopOnHover={false}
    >
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80"
          alt="pics"
        />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80"
          alt="pics"
        />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80"
          alt="pics"
        />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
}
