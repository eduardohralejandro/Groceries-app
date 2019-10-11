import React, { Fragment, Component } from "react";

class AddItems extends Component {
  state = {
    itemTitle: "",
    items: [],
    messageError: "",
    checkbox:false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidUpdate(prevProps) {
    const {shoppingLists} = this.props
    if (shoppingLists !== prevProps.shoppingLists) {
      this.setState({items:[]})
    }
  }
  
  addItems = (e) => {
    e.preventDefault()
    const { itemTitle, checkbox } = this.state;
    const newElement = { itemTitle, checkbox, person:"", price:"", month:""};

    if (!itemTitle) {
      this.setState({ messageError: "You can not save empty information" })
      return;
    } else {
      this.setState(prevState => ({
        items: [...prevState.items, newElement],
        messageError: "",
      }));
    }
  }
  deleteItem = (_, ID) => {
    const {items} = this.state
    this.setState({
      items: items.filter((_, keyItem) => {
      return ID !== keyItem
    })})
  }
  render() {
    const {showInputs, saveShoppingList} = this.props
    const {items, messageError} = this.state
    return (
      <Fragment>
        {messageError}
        {showInputs ? 
        <div>
        <button onMouseDown={() => {
          return (
      
           saveShoppingList(items))
        }}>
  SAVE SHOPPING LIST
          </button>
             <form onSubmit={(e) => this.addItems(e)}>
             <input
placeholder="item"
name="itemTitle"

onChange={e => this.handleChange(e)}
             />
             
             <button>add items</button>
            </form>
            </div>
      :
          null
      }
        
        {items.map((element, key) => {
          return (
            <div key={key}>
              <p>{element.itemTitle}</p>
              <button onClick={(e) => this.deleteItem(e, key)}>delete</button>
            </div>
          );
        })}
      </Fragment>
    );
  }
}

export default AddItems;