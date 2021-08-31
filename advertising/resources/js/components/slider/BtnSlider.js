import React from "react";
import "../../../css/app.css";
import leftArrow from "../../../css/icons/left-arrow.svg";
import rightArrow from "../../../css/icons/right-arrow.svg";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
        type="button"
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
}
