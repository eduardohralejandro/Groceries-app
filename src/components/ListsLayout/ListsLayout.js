import React, { Fragment, Component } from "react";
import styles from "./listsLayout.module.scss";
import Items from "../Items/Items";
import CreateLists from '../createLists/CreateLists'
import AddItems from '../AddItems/AddItems'
class ListsLayout extends Component {
  
  state = {
    groupTitle: "",
    shoppingLists: [],
    saveInfo: false,
    displayComponent: false,
    newItems: [],
    messageError: "",
    showInputs: false,
    bgColor:false
  };
    divRef = React.createRef()
 
  componentDidUpdate(prevProps, prevState) {
  const {shoppingLists} = this.state
    if (prevState.shoppingLists !== shoppingLists) {
      console.log('hellloooo')
      this.setState({showInputs:false})
    }
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }
  
  showInputsFunc = (outsideClick) => {
    console.log(outsideClick)
    this.setState({ showInputs: true})
    // if (outsideClick) {
    // this.setState({showInputs:false})
    // } 
  };
  bgColor = () => {
    this.setState({bgColor:true})
  }
  handleClickOutside = e => {
    // // const { showInputsFunc } = this.props
    // if (this.divRef.current && !this.divRef.current.contains(e.target) && !!this.state.showInputs) {
    //   this.setState({ showInputs:false})
    // }
  }
  
 
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
  displayComponent = (type, ID) => {
   
    if (type === 'list') {
      this.setState({displayComponent:"list"})
    } else if (type === 'recipes') {
      this.setState({displayComponent:"recipes"})
    } else if (type === "expenses") {
      this.setState({displayComponent:"expenses"})
    }
    this.setState({bgColor:ID})
  };
  render() {
    const { messageError, items, newItems, shoppingLists, saveInfo, itemTitle, showInputs, bgColor } = this.state;
    const bgColorLogic = bgColor ? {backgroundColor:"#cccccc"} : null
    return (
      <Fragment>
        {/* <SearchBar  />  */}
        <div className={styles.btnsDisplayComponents}>
        <button  id={"btnDisplayId"} style={bgColor === 0 ? {backgroundColor:"#cccccc", borderBottom: "3px solid #293133" } : null} className={styles.btnDisplay}onClick={() => this.displayComponent("list", 0)}>
          Your Lists
        </button>
        <button id={"btnDisplayId"} style={bgColor === 1 ? {backgroundColor:"#cccccc", borderBottom: "3px solid #293133" } : null} className={styles.btnDisplay} onClick={() => this.displayComponent("recipes", 1)}>
          Recipes
        </button>
        <button id={"btnDisplayId"} style={bgColor === 2 ? {backgroundColor:"#cccccc" , borderBottom: "3px solid #293133"} : null} className={styles.btnDisplay} onClick={() => this.displayComponent("expenses", 2)}>
           Expenses
        </button>
        </div>
       
       <div><p>{messageError}</p></div> 
       
        <CreateLists
          saveShoppingList={this.saveShoppingList}
          displayComponent={this.state.displayComponent}
          shoppingLists={shoppingLists}
          newItems={newItems}
          handleChange={this.handleChange}
          showInputsFunc={this.showInputsFunc}
          showInputs={showInputs}
          divRef={this.divRef}
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
          divRef={this.divRef}
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
       
      </Fragment>
    );
  }
}

export default ListsLayout;
