import React, { Fragment, Component } from "react";
// import styles from "./listsLayout.module.scss";

// import SearchBar from './SearchBar'
// import Items from './Items'
class Items extends Component {
  render() {
    const { items } = this.props;

    return (
      <Fragment>
        <div>
          <div>
            <input
              autoFocus={true}
              placeholder="add group title"
              type="text"
              name="groupTitle"
              onChange={e => this.props.handleChange(e)}
            />
            <input
              placeholder="item"
              name="itemTitle"
              onChange={e => this.props.handleChange(e)}
            />
          </div>

          <button onMouseDown={() => this.props.addItems()}>add items</button>
          <button onMouseDown={() => this.props.saveShoppingList()}>
            SAVE SHOPPING LIST
          </button>
        </div>

        {items.map((element, key) => {
          return (
            <div key={key}>
              <p>{element.itemTitle}</p>
            </div>
          );
        })}
      </Fragment>
    );
  }
}

export default Items;
