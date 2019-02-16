// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import recipeActions from '../lib/redux/actions/recipe';
import { auth } from '../lib/firebase';

type Props = {
	recipe?: Recipe,
};

type State = Recipe;

class RecipeCreator extends Component<Props, State> {
	constructor(props) {
		super(props);

		const { recipe: defaultRecipe = {} } = props;

		this.state = {
			name: '',
			picture: '',
			notes: '',
			prepTime: '',
			cookTime: '',
			totalTime: '',
			serves: '',
			public: false,
			...defaultRecipe,
		};

		this.handleChange = this.handleChange.bind(this);
		this.saveRecipe = this.saveRecipe.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.recipe.id !== prevState.id) return { ...nextProps.recipe };

		return prevState;
	}

	handleChange(
		{
			target: { name, value },
		},
		checkedValue
	) {
		if (checkedValue === undefined) this.setState({ [name]: value });
		else this.setState({ public: checkedValue });
	}

	saveRecipe() {
		const now = new Date();

		const { id, ...state } = this.state;

		const newRecipe = {
			...state,
			updatedAt: now,
		};

		if (id) {
			this.props.dispatch(recipeActions.updateRecipe(id, newRecipe));
		} else {
			newRecipe.createdAt = now;
			newRecipe.author = auth.getAuth().user.uid;

			this.props.dispatch(recipeActions.createRecipe(newRecipe));
		}
	}

	render() {
		return (
			<Grid
				container
				spacing={8}
				justify="center"
				alignItems="center"
				style={{ width: '95%', margin: 'auto auto' }}
			>
				<Grid item xs={12}>
					<h1>{this.state.id ? 'Update Recipe' : 'Create Recipe'}</h1>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						label="Name"
						name="name"
						onChange={this.handleChange}
						value={this.state.name}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						label="Picture URL"
						name="picture"
						onChange={this.handleChange}
						value={this.state.picture}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						label="Servings"
						name="serves"
						onChange={this.handleChange}
						value={this.state.serves}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						label="Prep Time"
						name="prepTime"
						onChange={this.handleChange}
						value={this.state.prepTime}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						label="Cook Time"
						name="cookTime"
						onChange={this.handleChange}
						value={this.state.cookTime}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						label="Total Time"
						name="totalTime"
						onChange={this.handleChange}
						value={this.state.totalTime}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Notes"
						name="notes"
						onChange={this.handleChange}
						value={this.state.notes}
						variant="outlined"
						multiline
						rows="5"
						fullWidth
					/>
				</Grid>
				<Grid item xs={3} />
				<Grid item xs={3}>
					<FormControlLabel
						control={
							<Checkbox
								name="public"
								style={{ margin: 10 }}
								onChange={this.handleChange}
								checked={this.state.public}
								color={this.state.public ? 'primary' : 'secondary'}
							/>
						}
						label="Public"
					/>
				</Grid>
				<Grid item xs={3}>
					<Button color="primary" onClick={this.saveRecipe}>
						{this.state.id ? 'Update' : 'Save'}
					</Button>
				</Grid>
				<Grid item xs={3} />
			</Grid>
		);
	}
}

export default connect(store => {
	const {
		recipeReducer: { editingRecipe: recipe },
	} = store;

	return { recipe };
})(RecipeCreator);
