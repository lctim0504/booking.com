import React, { useState } from 'react'
import "./header.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as locales from 'react-date-range/dist/locale';//用它來叫出不同版本的語言翻譯，把日曆換成中文
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { setDate } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  //目的地
  const [destination, setDestination] = useState("");
  //日期
  const [openCalendar, setOpenCalendar] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  const yesterday = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  yesterday.setDate(today.getDate() - 1);
  const [dates, setDates] = useState([
    {
      startDate: today,
      endDate: tomorrow,
      key: 'selection',
    }
  ]);
  //人數
  const [openConditions, setOpenConditions] = useState(false);
  const [conditions, setConditions] = useState(
    {
      adult: 1,
      children: 0,
      room: 1,
    }
  );
  //人數2
  const ConditionGroup = ({ name, value, onDecrease, onIncrease, disabled }) => {
    return (
      <div className="conditionCounter">
        <button
          className="conditionCounterButton"
          onClick={() => onDecrease(name)}
          disabled={disabled}
        >
          -
        </button>
        <span className="number">{value}</span>
        <button
          className="conditionCounterButton"
          onClick={() => onIncrease(name)}
        >
          +
        </button>
      </div>
    );
  };
  const handleCounter = (name, sign) => {
    setConditions((prev) => ({
      ...prev,
      [name]:
        sign === "increase" ? prev[name] + 1 : Math.max(prev[name] - 1, 0),
    }));
  };
  const handleDecrease = (name) => {
    handleCounter(name, "decrease");
  };
  const handleIncrease = (name) => {
    handleCounter(name, "increase");
  };

  //
  const handleSearchBarSubmit = () => {
    navigate("/hotelsList", { state: { destination, dates, conditions } })
  }


  console.log(destination, dates, conditions)
  return (
    <div className='header'>
      <div className="headerContainer">
        <h1 className="headerTitle">
          尋找下趟住宿
        </h1>
        <p className="headerDes">搜尋飯店、民宿及其他住宿類型的優惠…
          <br />Booking.com clone</p>
        <div className="headerSearchBar">
          {/* 地點 */}
          <div className="SearchBarItem">
            <FontAwesomeIcon icon={faBed} />
            <input type="Search" placeholder='你要去哪裡？' className='SearchInput' onChange={(e) => setDestination(e.target.value)} />
          </div>
          {/* 日期 */}
          <div className="SearchBarItem">
            <FontAwesomeIcon icon={faCalendar} onClick={() => setOpenCalendar(!openCalendar)} />
            <span className="SearchText" onClick={() => setOpenCalendar(!openCalendar)} >
              {format(dates[0].startDate, "yyyy-MM-dd")}  ~  {format(dates[0].endDate, "yyyy-MM-dd")}
            </span>
            {openCalendar && <DateRange
              editableDateInputs={true}
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={true}
              className="calendar"
              minDate={today}
              ranges={dates}
              locale={locales['zhTW']}
            />}
          </div>
          {/* 人數 */}
          <div className="SearchBarItem">
            <FontAwesomeIcon icon={faPeopleGroup} onClick={() => setOpenConditions(!openConditions)} />
            <span className="SearchText" onClick={() => setOpenConditions(!openConditions)} >
              {conditions.adult}位成人 · {conditions.children}位小孩 ·{conditions.room}間房
            </span>
            {/* {openConditions &&
              <div className="ConditionsContainer">
                <div className="condition">
                  成人
                  <div className="conditionCounter">
                    <button className="conditionCounterButton" onClick={() => handleCounter("adult", "decrease")} disabled={conditions.adult <= 1}>
                      -
                    </button>
                    <span className="number">{conditions.adult}</span>
                    <button className="conditionCounterButton" nClick={() => handleCounter("adult", "increase")}>
                      +
                    </button>
                  </div>
                </div>
                <div className="condition">
                  <span>小孩
                    <p>0-17 歲</p>
                  </span>

                  <div className="conditionCounter">
                    <button className="conditionCounterButton" onClick={() => handleCounter("children", "decrease")} disabled={conditions.children <= 0}>
                      -
                    </button>
                    <span className="number">{conditions.children}</span>
                    <button className="conditionCounterButton" onClick={() => handleCounter("children", "increase")}>
                      +
                    </button>
                  </div>
                </div>

                <div className="condition">
                  房間
                  <div className="conditionCounter">
                    <button className="conditionCounterButton" onClick={() => handleCounter("room", "decrease")} disabled={conditions.room <= 1}>
                      -
                    </button>
                    <span className="number">{conditions.room}</span>
                    <button className="conditionCounterButton" onClick={() => handleCounter("room", "increase")}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            } */}
            {openConditions && (
              <div className="ConditionsContainer">
                <div className="condition">
                  成人
                  <ConditionGroup
                    name="adult"
                    value={conditions.adult}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disabled={conditions.adult <= 1}
                  />
                </div>
                <div className="condition">
                  <span>
                    小孩
                    <p>0-17 歲</p>
                  </span>

                  <ConditionGroup
                    name="children"
                    value={conditions.children}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disabled={conditions.children <= 0}
                  />
                </div>

                <div className="condition">
                  房間
                  <ConditionGroup
                    name="room"
                    value={conditions.room}
                    onDecrease={handleDecrease}
                    onIncrease={handleIncrease}
                    disabled={conditions.room <= 1}
                  />
                </div>
              </div>
            )}
          </div>
          {/* 搜尋 */}
          <button className='SearchBarBtn' onClick={handleSearchBarSubmit}>搜尋</button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Header);