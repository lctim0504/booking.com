import React from 'react'
import Categories from '../subcomponents/Categories'
import "./feature.scss"
import { CategoriesCities, CategoriesType } from '../data'

const Feature = () => {
    return (
        <div className='feature'>
            <div className="container">
                <div className="listTitle">
                    <h2>依住宿類型瀏覽</h2>
                </div>
                <div className="list">
                    <Categories dataArray={CategoriesType} />
                </div>
                <div className="listItems">
                    {/* <Postcards /> */}
                </div>
                <div className="listTitle">
                    <h3>探索臺灣</h3>
                    <p>這些熱門目的地魅力無窮，等你來體驗！</p>
                </div>
                <div className="list">
                    <Categories dataArray={CategoriesCities} />
                </div>
            </div>
        </div>
    )
}

export default Feature