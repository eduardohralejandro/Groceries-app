import React, { Fragment, Component } from "react";
import styles from "./listsLayout.module.scss";

import Expenses from '../Expenses/Expenses'
import Recipes from "../Recipes/Recipes";
import Items from "./Items";

class ListsLayout extends Component {
  state = {
    groupTitle: "",
    itemTitle: "",
    items: [],
    shoppingLists: [],
    showInputs: false,
    checkbox: false,
    person: "",
    price: "",
    saveInfo: false,
    showRecipes: false,
    newItems: [],
    month:""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveShoppingList = async () => {
    const { groupTitle, items } = this.state;
    const newList = { title: groupTitle, items };

    this.setState(prevState => ({
      shoppingLists: [...prevState.shoppingLists, newList],
      showInputs: false,
      items: [],
      person: "",
      price: "",
      newItems: items
    }));
  };

  saveInfo = (_, ID) => {
    const { shoppingLists, price, person } = this.state;
    const date = new Date(); 
    const month = date.toLocaleString('default', { month: 'long' });

    shoppingLists.forEach((list, idList) => {
      return list.items.forEach((item, key) => {
        const newKey = `${idList}-${item.itemTitle}-${key}`;
        if (ID === newKey) {
          item.price = price;
          item.person = person;
          item.month = month;
          const newState = [...shoppingLists];
          this.setState(() => ({
            shoppingLists: newState,
            person: "",
            price: "",
            date:"",
            saveInfo: false
          }));
        }
      });
    });
  };

  addItems = () => {
    const { itemTitle, checkbox, person, price, month } = this.state;
    const newElement = { itemTitle, checkbox, person, price, month };
    this.setState(prevState => ({
      items: [...prevState.items, newElement]
    }));
  };

  showInputs = () => {
    this.setState({ showInputs: true, items: [] });
  };

  handleCheckbox = async (e, ID) => {
    const { shoppingLists } = this.state;
    shoppingLists.forEach((element, idList) => {
      return element.items.forEach((el, key) => {
        const newKey = `${idList}-${el.itemTitle}-${key}`;

        if (ID === newKey) {
          el.checkbox = e.target.checked;
          const newState = [...this.state.shoppingLists];

          this.setState({ saveInfo: ID, shoppingLists: newState });
        }
      });
    });
  };

  displayRecipes = () => {
    this.setState({ showRecipes: !this.state.showRecipes });
  };
  render() {
    const {
      shoppingLists,
      showInputs,
      items,
      showRecipes,
      newItems
    } = this.state;

    return (
      <Fragment>
        {/* <SearchBar  />  */}
       
        <button onClick={() => this.displayRecipes()}>
          {!this.state.showRecipes ? "recipes" : "lists"}
        </button>
        {showRecipes ? (
          <div>
             <Expenses  shoppingLists={shoppingLists} />
            <Recipes shoppingLists={shoppingLists} newItems={newItems} />
          </div>
        ) : (
          <div>
            <button onMouseDown={() => this.showInputs()}>
              + Add new list
            </button>
            {showInputs ? (
              <div>
                <Items
                  saveShoppingList={this.saveShoppingList}
                  addItems={this.addItems}
                  showInputs={showInputs}
                  items={items}
                  handleChange={this.handleChange}
                />
              </div>
            ) : (
              <p
                style={
                  shoppingLists.length > 0
                    ? { display: "none" }
                    : { display: "block" }
                }
              >
                your items will be here
              </p>
            )}

            {shoppingLists.map((el, key) => {
              return (
                <div key={key} className={styles.ItemsStyle}>
                  <p>{el.title}</p>

                  {el.items.map((el, key2) => {
                    const uniqueKey = `${key}-${el.itemTitle}-${key2}`;
                    return (
                      <div key={uniqueKey}>
                        <p
                          style={
                            this.state.saveInfo === 0
                              ? { textDecoration: "line-through" }
                              : null
                          }
                        >
                          {el.itemTitle}
                        </p>
                        <p>{el.person}</p>
                        <p>{el.price}</p>
                        <input
                          checked={el.checkbox}
                          name="checkboxname"
                          onChange={e => this.handleCheckbox(e, uniqueKey)}
                          type="checkbox"
                        />
                        {this.state.saveInfo === uniqueKey ? (
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
                                this.saveInfo(e, uniqueKey);
                              }}
                            >
                              save
                            </button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    );
  }
}

export default ListsLayout;
