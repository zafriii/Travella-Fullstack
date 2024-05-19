import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";

function Star( {stars} ) {

const ratingStar= Array.from({length: 5 }, (elem, ind) => {

    let number = ind + 0.5;

    return <span key={ind}>

        {
          stars >= ind + 1 ? <FaStar/> : stars >= number ? <FaRegStarHalfStroke/> : <FaRegStar/>
        }

    </span>
})


  return (
    <div>

    {ratingStar}

    </div>
  )
}

export default Star