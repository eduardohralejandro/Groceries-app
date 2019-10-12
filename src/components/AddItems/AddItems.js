import React, { Fragment, Component } from "react";
import styles from "./addItems.module.scss";
class AddItems extends Component {
  state = {
    itemTitle: "",
    items: [],
    messageError: "",
    checkbox: false
  };

  // componentDidMount() {
  //   document.addEventListener("click", this.handleClickOutside, true);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener("click", this.handleClickOutside, true);
  // }

  // handleClickOutside = e => {
  //   const { showInputsFunc } = this.props
  //   if (this.props.divRef.current && !this.props.divRef.current.contains(e.target)) {
  //    showInputsFunc(false)
  //   }
  // }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    const { shoppingLists } = this.props;
    if (shoppingLists !== prevProps.shoppingLists) {
      this.setState({ items: [] });
    }
  }

  addItems = e => {
    e.preventDefault();
    const { itemTitle, checkbox } = this.state;
    const newElement = {
      itemTitle,
      checkbox,
      person: "",
      price: "",
      month: ""
    };

    if (!itemTitle) {
      this.setState({ messageError: "You can not save empty information" });
      return;
    } else {
      this.setState(prevState => ({
        items: [...prevState.items, newElement],
        messageError: ""
      }));
    }
  };

  deleteItem = (_, ID) => {
    const { items } = this.state;
    this.setState({
      items: items.filter((_, keyItem) => {
        return ID !== keyItem;
      })
    });
  };

  render() {
    const { showInputs, saveShoppingList } = this.props;
    const { items, messageError } = this.state;
    return (
      <Fragment>
        {messageError}
        {showInputs ? (
          <div className={styles.inputsContainer} ref={this.props.divRef}>
            <button
              className={styles.btnsaveShoppingList}
              onMouseDown={() => {
                return saveShoppingList(items);
              }}
            >
              Save list
            </button>
          
              <input
                className={styles.inputCreateLists}
                autoFocus={true}
                placeholder="Add group title"
                type="text"
                name="groupTitle"
                onChange={e => this.props.handleChange(e)}
              />
            
            <form className={styles.formAddItems} onSubmit={e => this.addItems(e)}>
              <div>
            <button className={styles.addBtn}>+</button>
              <input
                placeholder="Add item"
                name="itemTitle"
                onChange={e => this.handleChange(e)}
                />
                </div>
              <div className={styles.itemsList}>
{items.map((element, key) => {
  return (
    <div onClick={e => this.deleteItem(e, key)} className={styles.newItemContainer} key={key}>
      <div>
        <p>{element.itemTitle}</p>
      </div>
      <div>
        <button>Delete</button>
        </div>
    </div>
  );
})}
                </div>
            </form>
            
          </div>
        ) : null}

        
      </Fragment>
    );
  }
}

export default AddItems;
