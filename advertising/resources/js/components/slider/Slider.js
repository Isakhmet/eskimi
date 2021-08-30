import React, {useState} from 'react'
import "../../../css/app.css";
import BtnSlider from './BtnSlider'

const Slider = (images) => {
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== images.images.length){
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === images.images.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(images.images.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {
                images.images.map( (image, index) => {
                return (
                    <div
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img
                        src={'/' + image.path}
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: images.images.length}).map((item, index) => (
                    <div
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}

export default Slider
