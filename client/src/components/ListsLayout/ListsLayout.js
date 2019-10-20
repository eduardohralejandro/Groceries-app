import React, { Fragment, Component } from "react";
import styles from "./listsLayout.module.scss";
import Items from "../Items/Items";
import CreateLists from "../createLists/CreateLists";
import AddItems from "../AddItems/AddItems";
import Search from '../Search/Search'
class ListsLayout extends Component {
   state = {
      groupTitle: "",
      shoppingLists: [],
      saveInfo: false,
      displayComponent: "list",
      newItems: [],
      messageError: "",
      showInputs: false,
      bgColor: false,
      searchedValue:[]
   };

   componentDidUpdate(prevProps, prevState) {
      const { shoppingLists } = this.state;
      if (prevState.shoppingLists !== shoppingLists) {
         this.setState({ showInputs: false });
      } else if (prevState.displayComponent !== this.state.displayComponent) {
         this.setState({ showInputs: false });
      }

     
   }

   showInputsFunc = () => {
      this.setState({ showInputs: true });
   };

   bgColor = () => {
      this.setState({ bgColor: true });
   };

   handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
   };

   searchedValue = async (value) => {
      if (value && value.length > 0) {
         await this.setState({searchedValue:value})
      } else if (value && value.length === 0) {
         await this.setState({ searchedValue: [] })
        
      }
   }

   saveShoppingList = items => {
      const { groupTitle } = this.state;
      const newList = { title: groupTitle, items };

      if (!groupTitle || items.length === 0) {
         this.setState({ messageError: "Please fill the required information" });
         return;
      } else {
         this.setState(prevState => ({
            shoppingLists: [...prevState.shoppingLists, newList],
            newItems: items,
            messageError: "",
            groupTitle: ""
         }));
      }
   };

   saveProductInfo = (_, ID, price, person) => {
      const date = new Date();
      const month = date.toLocaleString("default", { month: "long" });
      if (!price || !person) {
         this.setState({ messageError: "Information required" });
         return;
      } else {
         this.setState(prevState => ({
            shoppingLists: prevState.shoppingLists.map((list, idList) => {
               const newShopList = {
                  title: list.title,
                  items: list.items.map((item, keyItem) => {
                     const newKey = `${idList}-${item.itemTitle}-${keyItem}`;
                     if (ID === newKey) {
                        return { itemTitle: item.itemTitle, price, person, month, checkbox: item.checkbox };
                     }
                     return item;
                  })
               };
               return newShopList;
            }),
            messageError: "",
            saveInfo: false
         }));
      }
   };

   handleCheckbox = (_, ID) => {
      this.setState(prevState => ({
         shoppingLists: prevState.shoppingLists.map((list, idList) => {
            const newShopList = {
               title: list.title,
               items: list.items.map((item, key) => {
                  const newKey = `${idList}-${item.itemTitle}-${key}`;
                  if (ID === newKey) {
                     return {
                        itemTitle: item.itemTitle,
                        price: item.checkbox ? "" : item.price,
                        person: item.checkbox ? "" : item.person,
                        month: item.month,
                        checkbox: !item.checkbox
                     };
                  }
                  return item;
               })
            };
            return newShopList;
         }),
         saveInfo: ID
      }));
   };

   deleteList = ID => {
      const { shoppingLists } = this.state;
      this.setState({
         shoppingLists: shoppingLists.filter((_, keyList) => {
            return keyList !== ID;
         })
      });
   };

   displayComponent = (type, ID) => {
      if (type === "list") {
         this.setState({ displayComponent: "list" });
      } else if (type === "recipes") {
         this.setState({ displayComponent: "recipes" });
      } else if (type === "expenses") {
         this.setState({ displayComponent: "expenses" });
      }
      this.setState({ bgColor: ID });
   };

   render() {
      const { messageError, items, newItems, shoppingLists, saveInfo, itemTitle, showInputs, bgColor } = this.state;

      return (
         <Fragment>
               <Search  shoppingLists={shoppingLists} searchedValue={this.searchedValue}  displayComponent={this.state.displayComponent}/>
            <div className={styles.btnsDisplayComponents}>
               <button
                  id={"btnDisplayId"}
                  style={bgColor === 0 ? { backgroundColor: "#d4d2ff", borderBottom: "3px solid #443bff", color: "#443bff" } : null}
                  className={styles.btnDisplay}
                  onClick={() => this.displayComponent("list", 0)}>
                  Your Lists
               </button>
               <button
                  id={"btnDisplayId"}
                  style={bgColor === 1 ? { backgroundColor: "#d4d2ff", borderBottom: "3px solid #443bff", color: "#443bff" } : null}
                  className={styles.btnDisplay}
                  onClick={() => this.displayComponent("recipes", 1)}>
                  Recipes
               </button>
               <button
                  id={"btnDisplayId"}
                  style={bgColor === 2 ? { backgroundColor: "#d4d2ff", borderBottom: "3px solid #443bff", color: "#443bff" } : null}
                  className={styles.btnDisplay}
                  onClick={() => this.displayComponent("expenses", 2)}>
                  Expenses
               </button>
            </div>

            <div className={styles.errorMessage}>
               <p>{messageError}</p>
            </div>
         
            <CreateLists
               saveShoppingList={this.saveShoppingList}
               displayComponent={this.state.displayComponent}
               shoppingLists={shoppingLists}
               newItems={newItems}
               handleChange={this.handleChange}
               showInputsFunc={this.showInputsFunc}
               showInputs={showInputs}
            />

            <AddItems
               addItems={this.addItems}
               deleteItem={this.deleteItem}
               items={items}
               shoppingLists={shoppingLists}
               saveShoppingList={this.saveShoppingList}
               showInputs={showInputs}
               handleChange={this.handleChange}
               showInputsFunc={this.showInputsFunc}
            />

            <Items
               itemTitle={itemTitle}
               saveProductInfo={this.saveProductInfo}
               saveInfo={saveInfo}
               handleCheckbox={this.handleCheckbox}
               shoppingLists={shoppingLists}
               newItemTitle={this.newItemTitle}
               deleteList={this.deleteList}
               showInputs={showInputs}
               displayComponent={this.state.displayComponent}
               searchedValue={this.state.searchedValue}
            />
         </Fragment>
      );
   }
}

export default ListsLayout;
