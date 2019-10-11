import React, { Fragment, Component } from "react";
import styles from "./items.module.scss";

class Items extends Component {
  state = {
    editInput: false,
    person: "",
    price: "",
    newItemTitle:""
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  editInput = (e, ID) => {
    this.setState({editInput:ID})
  }

  render() {
    const { shoppingLists, handleCheckbox, saveProductInfo, deleteList} = this.props;
    const {price, person, newItemTitle, editInput  } = this.state

    return (
      <Fragment>
  
               {shoppingLists.map((el, key) => {
              return (
                <div key={key} className={styles.ItemsStyle}>
                  <button onClick={() => deleteList(key)}>delete list</button>
                  <p>{el.title}</p>

                  {el.items.map((el, key2) => {
                 
                    const uniqueKey = `${key}-${el.itemTitle}-${key2}`;
                    return (
                      <div key={uniqueKey}>
                        {editInput === uniqueKey ? 
                          <div>

            <input name="newItemTitle" onKeyDown={(e) => {this.props.newItemTitle(e, uniqueKey, newItemTitle)
                            }} autoFocus={true} placeholder={el.itemTitle} onChange={(e) => this.handleChange(e)}  />
                          </div>
                          :
                          <div
                         
                        >
                          <p  style={el.checkbox ? {color:"red"} : null}  onClick={(e) => this.editInput(e, uniqueKey)}>{el.itemTitle}</p>
                        </div>
                      }
                        
                        <p>{el.person}</p>
                        <p>{el.price}</p>
                       
                        <input
                          name="checkboxname"
                          onChange={e => handleCheckbox(e, uniqueKey)}
                          type="checkbox"
                        />
                        {el.checkbox && this.props.saveInfo === uniqueKey && this.props.saveInfo ? (
                          <div>
                            <input
                              type="number"
                              name="price"
                              onChange={e => this.handleChange(e)}
                              placeholder="price"
                            />
                            <input
                              name="person"
                              onChange={e => this.handleChange(e)}
                              placeholder="person"
                            />
                            <button
                              onClick={e => {
                               
                                saveProductInfo(e, uniqueKey, price, person);
                              }}
                            >
                              save price and name
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
      </Fragment>
    );
  }
}

export default Items;
