import React from 'react'
import Categories from '../subcomponents/Categories'
import "./feature.scss"
import { CategoriesCities, CategoriesType } from '../data'
import Postcards from '../subcomponents/PostCards'
import UseFetch from '../hooks/UseFetch'
import { Link } from 'react-router-dom'
import PopularHotels from '../subcomponents/PopularHotels'

const Feature = () => {

    const { data, loading, error } = UseFetch("/hotels")
    const typeUrl = `/hotels/filter?type=${CategoriesType.map((type) => type.name)}`
    const citiesUrl = `/hotels/filter?city=${CategoriesCities.map((city) => city.name)}`
    //console.log(typeUrl, citiesUrl)

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
                    <Postcards />
                </div>
                <div className="listTitle">
                    <h3>探索臺灣</h3>
                    <p>這些熱門目的地魅力無窮，等你來體驗！</p>
                </div>
                <div className="list">
                    <Categories dataArray={CategoriesType} url={typeUrl} />
                    <Categories dataArray={CategoriesCities} url={citiesUrl} />
                </div>
                <div className="listTitle">
                    <h2>人氣民宿、公寓類型住宿</h2>
                </div>
                <div className="listItems">
                    <PopularHotels dataArray={data} loading={true} />
                </div>
            </div>
        </div>
    )
}

export default Feature