import React from 'react';
import { Carousel } from 'react-bootstrap'

const CarouselSlides = ( { products, loading }) => {
  const tempArr=[...products]
  function compare_rating(a, b) {
    if (Number(a.rating) > Number(b.rating))
      return -1;
    else return 1;
  }
  tempArr.sort(compare_rating)


  return <div>
    {(!loading && tempArr.length>=3) && <Carousel>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>{tempArr[0].name}</h3>
        </Carousel.Caption>
        <img
          className="d-block w-100"
          src={tempArr[0].image}
          alt={tempArr[0].image}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>{tempArr[1].name}</h3>
        </Carousel.Caption>
        <img
          className="d-block w-100"
          src={tempArr[1].image}
          alt={tempArr[1].image}
        />
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>{tempArr[2].name}</h3>
        </Carousel.Caption>
        <img
          className="d-block w-100"
          src={tempArr[2].image}
          alt={tempArr[2].image}
        />
      </Carousel.Item>
    </Carousel>
}
  </div>;
};

export default CarouselSlides;
