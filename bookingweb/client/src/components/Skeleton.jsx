import React from 'react'
import "./skeleton.scss"

const Skeleton = ({ type, length }) => {
    const number = length //要生成多少個遮障
    const PopularHotelSkeleton = ({ ketIndex }) => (
        <div className="popularHotelSK" key={ketIndex} >
            <div className='imgSK' />
            <div className="InfoSK">
                <div className="titleSK" />
                <div className="subTitleSK" />
                <div className="priceSK" />
                <div className="rateAndCommentSK" />
            </div>
        </div>
    );
    const AmountSkeleton = () => (
        <div className="amountSK" />
    );

    if (type === "popularHotels") return Array(number).fill().map((item, i) => <PopularHotelSkeleton key={i} />);
    if (type === "Amount") return (<AmountSkeleton />);
}
export default Skeleton