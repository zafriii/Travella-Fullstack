
import React, { useState, useEffect } from 'react';
import { useList } from '../store/ListContext';
import './list.css'

function List() {
  const { state, dispatch } = useList();

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem('list');
    if (storedList) {
      dispatch({ type: 'LOAD_LIST', payload: JSON.parse(storedList) });
    }
  }, [dispatch]);

  
  useEffect(() => {
    setDates(state.list.map(item => ({
      id: item.id,
      startDate: '',
      endDate: '',
    })));
  }, [state.list]);


  const handleRemoveItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };




  useEffect(() => {
    setDates(state.list.map(item => {
      const storedItemDates = JSON.parse(localStorage.getItem(`date-${item.id}`));
      return {
        id: item.id,
        startDate: storedItemDates ? storedItemDates.startDate : '',
        endDate: storedItemDates ? storedItemDates.endDate : '',
      };
    }));
  }, [state.list]);

  
  const handleDateChange = (itemId, field, value) => {
    setDates(prevDates => prevDates.map(date => {
      if (date.id === itemId) {
        const updatedDate = {
          ...date,
          [field]: value,
        };
        
        localStorage.setItem(`date-${itemId}`, JSON.stringify(updatedDate));
        return updatedDate;
      }
      return date;
    }));
  };



  return (

    <div className="list-sec">
    <div className='list'>
      <h2>Trip Lists</h2>
      {state.list.map((item, index) => (
        <div key={item.id}>

          <div className="head-btn">

          <h3> {index + 1}. {item.country}</h3>
          <button className='rmv' onClick={() => handleRemoveItem(item.id)}>Remove</button>

          </div>

          <p>Places: {item.place.join(', ')}</p>
          <p>Hotel: {item.Hotel.name} - $ {item.Hotel.costPerNight}</p>
          <p>Stays: {item.stays}</p>        

          <div className="date">

          {dates[index] && (
            <>

          <h2 className='mark'>Mark your trip dates</h2>

          <div className="date-inputs">  

              
              <label>
                Start Date:
                <input
                  type="date"
                  value={dates[index].startDate}
                  onChange={(e) => handleDateChange(item.id, 'startDate', e.target.value)}
                />
              </label>
              <br />
              <label className='end-date'>
                End Date:
                <input 
                  type="date"
                  value={dates[index].endDate}
                  onChange={(e) => handleDateChange(item.id, 'endDate', e.target.value)}
                />
              </label>

              </div>   
              <br />
              <div className='date-outputs'>
                <p>Start Date: {dates[index].startDate}</p>
                <p className='end-datep'>End Date: {dates[index].endDate}</p>
                
              </div>
            </>
          )}

        </div>
                

        </div>
      ))}
    </div>
    </div>
  );
}

export default List;
