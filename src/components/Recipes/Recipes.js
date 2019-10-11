import React, { Fragment, Component } from "react";
import axios from "axios";
import Select from "react-select";

class Recipes extends Component {
  state = {
    foodRecipes: [],
    itemSelected: null,
    errorMessage: "",
    newOptions: [],
    loader: false,
    tags: ""
  };
   componentDidMount() {
    const { shoppingLists } = this.props;

    shoppingLists.map(list => {
      return (
        list.items.map(item => {
          const options = { label: item.itemTitle, value: item.itemTitle };
          this.setState(prevState => ({
            newOptions: [...prevState.newOptions, options]
          }));
          return item
        })
      )
     
    });
  }

  handleSearchRecipe = (itemSelected) => {

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
        .catch(error => {
          this.setState({
            loader: false,
            errorMessage: "opss, something went wrong try again"
          });
          console.error(error);
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
          onChange={this.handleSearchRecipe}
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
