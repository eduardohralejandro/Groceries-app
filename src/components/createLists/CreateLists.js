import React, { Fragment, Component } from "react";
// import styles from "./listsLayout.module.scss";
import Expenses from '../Expenses/Expenses'
import Recipes from '../Recipes/Recipes'

class CreateLists extends Component {
  render() {
const {showRecipes, shoppingLists, newItems, showInputs} = this.props
    return (
        <Fragment>
            {showRecipes ? (
          <div>
             <Expenses  shoppingLists={shoppingLists} />
            <Recipes shoppingLists={shoppingLists} newItems={newItems} />
          </div>
        ) : (
                        <div>
                          
            <button  onMouseDown={() => this.props.showInputsFunc()}>
              + Add new list
            </button>
            

     
          </div>
          )}
            <div>
                {showInputs ? 
                 <input
                 autoFocus={true}
                 placeholder="add group title"
                 type="text"
                 name="groupTitle"
                
                 onChange={e => this.props.handleChange(e)}
                    />
                    :
                    null
            
            }
           
        
          <div>
         
          </div>

         
            </div>
           
       
      </Fragment>
    );
  }
}

export default CreateLists;
