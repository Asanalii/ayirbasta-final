import React from "react";
import ReviewsStyled from "./Reviews.styled";

const Reviews = (props) => {
  return props.index < props.show ? (
    <>
      <ReviewsStyled>
        <div className="image-pic">
          <img src={props.pic} alt="" />
        </div>
        <div className="info">
          <div className="about">
            <div className="about_person">
              <h3>{props.name}</h3>
              <p>{props.city}</p>
            </div>
            <div className="about_review">
              <p>{props.date}</p>
              <p>{props.stars}</p>
            </div>
          </div>
          <div>
            <p>{props.text}</p>
          </div>
        </div>
      </ReviewsStyled>
    </>
  ) : (
    <div></div>
  );
};

export default Reviews;
