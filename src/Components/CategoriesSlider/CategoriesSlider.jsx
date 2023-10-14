import React from 'react'
import styles from './CategoriesSlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true
    


  };

  function getCategoris() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }


  let { data } = useQuery("allCategories", getCategoris)
  // console.log(data);
  return (
    <>
      <Slider {...settings}>
        {data?.data?.data.map((ele) => <>
          <img height={200} className=' w-75 buttonMain ' src={ele.image} alt="" />
          <h4>{ele.name}</h4>
          <button className=' buttonMain'>check</button>
        </>)}
      </Slider>
    </>
  )
}
