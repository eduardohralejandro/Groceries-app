import React, { Fragment, Component } from "react";
import styles from "./createlists.module.scss";
import Expenses from '../Expenses/Expenses'
import Recipes from '../Recipes/Recipes'

class CreateLists extends Component {
  render() {
const {displayComponent, shoppingLists, newItems, showInputs} = this.props
    return (
      <Fragment>
        {displayComponent === "expenses" ? <Expenses shoppingLists={shoppingLists} /> : null}
        {displayComponent === "recipes" ? <Recipes shoppingLists={shoppingLists} newItems={newItems} /> : null}
        {displayComponent === "recipes" || displayComponent === "expenses" ?
          null
          :
          <div className={styles.btnContainer}>
          <button className={styles.btnAddNewlist} onMouseDown={() => this.props.showInputsFunc()}>
         + Create new list
       </button>
            {shoppingLists.length > 0 || showInputs ? null :
              <div>
                <div className={styles.itemsImg}>
               
                <img alt="items" src={'https://svgshare.com/i/FS_.svg'} />
                
                <div>
               <p>Your items will be here</p>
                </div>
              </div>    
             
              
               
                </div>
      } 
        </div>
        }
        
            
           
       
      </Fragment>
    );
  }
}

export default CreateLists;
