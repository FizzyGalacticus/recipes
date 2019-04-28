import React, { Component } from 'react';
import { connect } from 'react-redux';

class Recipe extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div>{JSON.stringify(this.props.recipe)}</div>;
	}
}

Recipe.defaultProps = {
	recipe: {},
};

export default connect((store, { match: { params: { recipeId } } }) => {
	const {
		recipeReducer: { allRecipes },
	} = store;

	return { recipe: allRecipes[recipeId] };
})(Recipe);
