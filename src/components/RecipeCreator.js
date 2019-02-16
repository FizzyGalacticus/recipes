// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';

import IngredientPicker from './IngredientPicker';

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
			ingredients: {},
			public: false,
			...defaultRecipe,
		};

		this.handleChange = this.handleChange.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.removeIngredient = this.removeIngredient.bind(this);
		this.saveRecipe = this.saveRecipe.bind(this);
	}

	static getDerivedStateFromProps(nextProps: Props, prevState: State) {
		if (nextProps.recipe.id !== prevState.id) return { ...nextProps.recipe };

		return prevState;
	}

	handleChange(
		{
			target: { name, value },
		},
		checkedValue: boolean
	) {
		if (checkedValue === undefined) this.setState({ [name]: value });
		else this.setState({ public: checkedValue });
	}

	addIngredient({ id }: RecipeIngredient = {}) {
		this.setState({
			ingredients: { ...this.state.ingredients, [id]: { measurementId: null, amount: 0 } },
		});
	}

	removeIngredient({ id }: RecipeIngredient = {}) {
		const ingredients = { ...this.state.ingredients };

		delete ingredients[id];

		this.setState({ ingredients });
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
				<Grid item xs={12} sm={6}>
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
				<Grid item xs={12} sm={6}>
					<Grid container>
						<Grid item>
							<IngredientPicker onSelect={this.addIngredient} />
						</Grid>
						<Grid item>
							{Object.entries(this.state.ingredients).map(([id, ingredient]) => {
								const fullIngredient = this.props.ingredients[id];

								return fullIngredient ? (
									<Chip
										key={id}
										label={fullIngredient.name}
										onDelete={(e: any) => this.removeIngredient({ id, ...fullIngredient })}
										color="primary"
										variant="outlined"
									/>
								) : null;
							})}
						</Grid>
					</Grid>
				</Grid>
				<Hidden smUp>
					<Grid item xs={3} />
				</Hidden>
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
				<Hidden smUp>
					<Grid item xs={3} />
				</Hidden>
			</Grid>
		);
	}
}

export default connect(store => {
	const {
		recipeReducer: { editingRecipe: recipe },
		ingredientReducer: { allIngredients: ingredients },
	} = store;

	return { recipe, ingredients };
})(RecipeCreator);
