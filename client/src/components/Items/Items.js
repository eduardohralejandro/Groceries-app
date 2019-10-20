import React, { Fragment, Component } from "react";
import styles from "./items.module.scss";

class Items extends Component {
  state = {
    person: "",
    price: ""
  };
  componentDidUpdate(prevState) {
    console.log(prevState)
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  editInput = (_, ID) => {
    this.setState({ editInput: ID });
  };

  render() {
    const { shoppingLists, handleCheckbox, saveProductInfo, deleteList, displayComponent, saveInfo, searchedValue } = this.props;
    const { price, person } = this.state;

    return (
      <Fragment>
        <div>
          {displayComponent !== "list"
            ? null
            :  (searchedValue && searchedValue.length > 0  ? searchedValue : shoppingLists).map((element, key) => {
                return (
                  <div key={key} className={styles.ItemsContainer}>
                    <div className={styles.savedList}>
                      <img alt='deleteList' className={styles.bin} onClick={() => deleteList(key)} src='https://svgshare.com/i/FSv.svg' />
                      <p className={styles.listTitle}>{element.title}</p>

                      {element.items.map((el, key2) => {
                        const uniqueKey = `${key}-${el.itemTitle}-${key2}`;
                        return (
                          <div key={uniqueKey}>
                            <div className={styles.itemsInfo}>
                              <div className={styles.itemTitle}>
                                <input name='checkboxname' onChange={e => handleCheckbox(e, uniqueKey)} type='checkbox' />
                                <p style={el.checkbox ? { textDecoration: "line-through" } : null} onClick={e => this.editInput(e, uniqueKey)}>
                                  {el.itemTitle}
                                </p>
                              </div>

                              <span className={styles.pricePersonTitle}>
                                <p>{el.price}</p>
                                <p>{el.person}</p>
                              </span>

                              {(el.checkbox && saveInfo === uniqueKey) || (el.checkbox && el.price.length === 0 && el.person.length === 0) ? (
                                <div className={styles.pricePersonContainer}>
                                  <input autoFocus={true} type='number' name='price' onChange={e => this.handleChange(e)} placeholder='price' />
                                  <input name='person' onChange={e => this.handleChange(e)} placeholder='person' />
                                  <button
                                    onClick={e => {
                                      saveProductInfo(e, uniqueKey, price, person);
                                    }}>
                                    save
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }) }
        </div>
      </Fragment>
    );
  }
}

export default Items;