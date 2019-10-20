import React, { useState, useEffect } from "react";
import styles from './search.module.scss'

const Search = ({ shoppingLists, searchedValue, displayComponent }) => {
    
    const [stringData, setStringData] = useState([])
    const [shopListTitle, setShopListTitle] = useState([])
  


    const handleChange =  async (e) => {
        const searchedItems = shopListTitle.filter(({ title }) => {
            if (title && e.target.value.length > 0) {
                return title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            } 
       })
       
        if (e.target.value.length === 0) {
            setStringData([])
            searchedValue([])
            return;
        } else if (e.target.value.length > 0) {
            setStringData(searchedItems)
             searchedValue(stringData)
        }
    }

    useEffect(() => {
        setShopListTitle(shoppingLists)
    })

  return (
      <div>
          {
        displayComponent === 'list' ?
        <div className={styles.searchInput}>
           <input placeholder="Search list" onChange={(e) => handleChange(e)} />
           </div>
           :
          null
          }
                  
         
      </div>
  );
};

export default Search