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
			<Grid container spacing={8} justify="center" alignItems="center">
				<Grid item xs={6} md={2}>
					<TextField
						label="Name"
						name="name"
						style={{ margin: 10 }}
						onChange={this.handleChange}
						value={this.state.name}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<TextField
						label="Picture URL"
						name="picture"
						style={{ margin: 10 }}
						onChange={this.handleChange}
						value={this.state.picture}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={8} />
				<Grid item xs={6} md={2}>
					<TextField
						label="Prep Time"
						name="prepTime"
						style={{ margin: 10 }}
						onChange={this.handleChange}
						value={this.state.prepTime}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={6} md={2}>
					<TextField
						label="Total Time"
						name="totalTime"
						style={{ margin: 10 }}
						onChange={this.handleChange}
						value={this.state.totalTime}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={8} />
				<Grid item xs={12} md={4}>
					<TextField
						label="Notes"
						name="notes"
						style={{ margin: 10 }}
						onChange={this.handleChange}
						value={this.state.notes}
						variant="outlined"
						multiline
						rows="5"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} md={8} />
				<Grid item xs={6} md={2}>
					<TextField
						label="Servings"
						name="serves"
						style={{ margin: 10 }}
						onChange={this.handleChange}
						value={this.state.serves}
						variant="outlined"
					/>
				</Grid>
				<Grid item md={1}>
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
				<Grid item md={1}>
					<Button color="primary" onClick={this.saveRecipe}>
						{this.state.id ? 'Update' : 'Save'}
					</Button>
				</Grid>
				<Grid item xs={12} md={8} />
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
