import React, {useState} from 'react';

type PropTypes = {
    CardInfo: Array<String>;
};

const FlashCard = ({ CardInfo }: PropTypes) => {
    const [ slideIndex, setSlideIndex ] = useState(0);

    const changeSlide = () => {
        setSlideIndex((slideIndex + 1) % 2);
    };

    return (
        <div className={"bg-success d-flex justify-content-center align-items-center m-2 rounded"} style={{width: "400px", height: "267px", cursor: "pointer"}} onClick={changeSlide}>
            <h4 className={"text-light"}>{CardInfo[slideIndex]}</h4>
        </div>
    );
};

export default FlashCard;
