import React, { Fragment, Component } from "react";
// import styles from "./listsLayout.module.scss";


import Items from "../Items/Items";
import CreateLists from '../createLists/CreateLists'
import AddItems from '../AddItems/AddItems'
class ListsLayout extends Component {
  
  state = {
    groupTitle: "",
    shoppingLists: [],
    saveInfo: false,
    showRecipes: false,
    newItems: [],
    messageError: "",
    showInputs: false
  };
  
  componentDidUpdate(prevProps, prevState) {
  const {shoppingLists} = this.state
    if (prevState.shoppingLists !== shoppingLists) {
      this.setState({showInputs:false})
    }
  }
  
showInputsFunc = () => {
   this.setState({ showInputs: true });
 };
 
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // newItemTitle = (e, ID, newItemTitle) => {
  //   if (e.keyCode === 13) {
  //     this.setState((prevState) => ({
  //       shoppingLists: prevState.shoppingLists.map((list, idList) => {
  //         const newShopList = {
  //           title: list.title, items: list.items.map((item, key) => {
  //             console.log(item)
  //             const newKey = `${idList}-${item.itemTitle}-${key}`;
  //             if (ID === newKey) {
  //               return { itemTitle: newItemTitle, price: item.price, person: item.person, month:item.month, checkbox:item.checkbox}
  //             }
  //             return item
  //           })
  //         }
  //         return newShopList
  //       })
  //     }))
  //   }
  // }

  saveShoppingList = (items) => {
    const { groupTitle } = this.state;
    const newList = { title: groupTitle, items }; 

    if (!groupTitle || items.length === 0) {
      this.setState({ messageError: "please fill the required information" })
      return;
    } else {
      this.setState(prevState => ({
        shoppingLists: [...prevState.shoppingLists, newList],
        newItems: items,
        messageError: "",
        groupTitle:""
      }));
    }
  };

  saveProductInfo =  (_, ID, price, person) => {
    const date = new Date(); 
    const month = date.toLocaleString('default', { month: 'long' })
    if (!price || !person) {
      this.setState({messageError:"information required"})
      return;
    } else {
      this.setState((prevState) => ({
        shoppingLists: prevState.shoppingLists.map((list, idList) => {
          const newShopList = {
            title: list.title, items: list.items.map((item, keyItem) => {
    
              const newKey = `${idList}-${item.itemTitle}-${keyItem}`;
              if (ID === newKey) {
                  return {itemTitle: item.itemTitle, price, person, month, checkbox:item.checkbox}
              }
              return item
            })
          }
          return newShopList
        }),
        messageError:"",
        saveInfo:false
      }))
    }
  };


  handleCheckbox = (_, ID) => {
     this.setState((prevState) => ({
      shoppingLists: prevState.shoppingLists.map((list, idList) => {

        const newShopList = {
          title: list.title, items: list.items.map((item, key) => {
            const newKey = `${idList}-${item.itemTitle}-${key}`;
            if (ID === newKey) {

              return { itemTitle: item.itemTitle, price: item.checkbox ? "" : item.price, person:item.checkbox ? "" : item.person, month:item.month,  checkbox:!item.checkbox}
            }
            return item
          })
        }
        return newShopList
      }),
      saveInfo: ID
    }))
  };
  deleteList = (ID) => {
    this.setState({
      shoppingLists: this.state.shoppingLists.filter((_, keyList) => {
        return keyList !== ID
      })
    })
  }
  displayRecipes = () => {
    this.setState({ showRecipes: !this.state.showRecipes });
  };
  render() {
    const { messageError, items, newItems, shoppingLists, saveInfo, itemTitle, showInputs } = this.state;

    return (
      <Fragment>
        {/* <SearchBar  />  */}
        <button onClick={() => this.displayRecipes()}>
          {!this.state.showRecipes ? "recipes" : "lists"}
        </button>
        <p>{messageError}</p>
       
        <CreateLists
          saveShoppingList={this.saveShoppingList}
          showRecipes={this.state.showRecipes}
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
        />
        <Items
          itemTitle={itemTitle}
          saveProductInfo={this.saveProductInfo}
          saveInfo={saveInfo}
          handleCheckbox={this.handleCheckbox}
          shoppingLists={shoppingLists}
          newItemTitle={this.newItemTitle}
          deleteList={this.deleteList}
        />
        {shoppingLists.length > 0  ?  null :  <p>your items will be here</p>}
       
      </Fragment>
    );
  }
}

export default ListsLayout;
