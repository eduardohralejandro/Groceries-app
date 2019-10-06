import React, { Fragment, Component } from "react";
import axios from "axios";
import Select from "react-select";

class Recipes extends Component {
  state = {
    foodRecipes: [],
    itemSelected: null,
    error: "",
    newOptions: [],
    loader: false,
    tags: ""
  };
  async componentDidMount() {
    const { shoppingLists } = this.props;

    shoppingLists.forEach(element => {
      element.items.forEach(el => {
        const options = { label: el.itemTitle, value: el.itemTitle };
        this.setState(prevState => ({
          newOptions: [...prevState.newOptions, options]
        }));
      });
    });
  }

  componentWillUnmount() {
    this.setState({ newOptions: false });
  }
  handleChange = (itemSelected) => {

    
    const APP_ID = `${process.env.REACT_APP_APP_ID}`;
    const APP_KEY = `${process.env.REACT_APP_APP_KEY}`;

    const url = `https://api.edamam.com/search?q=${itemSelected.value}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    this.setState({ loader: true }, async () => {
      await axios
        .get(url)
        .then(data => {
          this.setState({
            loader: false,
            foodRecipes: data.data.hits,
            tags: itemSelected.value
          });
        })
        .catch(e => {
          this.setState({
            loader: false,
            error: "opss, something went wrong try again"
          });
          console.log(e);
        });
    });
  };

  render() {
    const {
      itemSelected,
      tags,
      loader,
      foodRecipes,
      newOptions,
      error
    } = this.state;

    return (
      <Fragment>
        <h1>Recipes</h1>
        <Select
          value={itemSelected}
          onChange={this.handleChange}
          options={newOptions}
        />
        {tags}

        {loader ? (
          <div>
            <p>LOADING...</p>
          </div>
        ) : (
          <div>
            {foodRecipes.map((food, key) => {
              return (
                <div key={key}>
                  <img alt="food-recipe" src={food.recipe.image} />
                  <div>{food.recipe.label}</div>
                  {food.recipe.ingredients.map((text, keyText) => {
                    return (
                      <div key={keyText}>
                        <p>{text.text}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
        <p>{error}</p>
      </Fragment>
    );
  }
}

export default Recipes;
