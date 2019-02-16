// @flow

declare type RecipeInstruction = {
	text: string,
	number: number,
};

declare type IngredientMeasurement = {
	name: string,
	abbreviation?: string,
};

declare type RecipeIngredient = {
	name: string,
	isRecipe: boolean,
	recipeId?: FirebaseId,
};

declare type Recipe = {
	name: string,
	picture?: string,
	ingredients: {
		[FirebaseId]: {
			measurementId: FirebaseId,
			amount: number,
		},
	},
	instructions: [RecipeInstruction],
	notes: string,
	prepTime: string,
	cookTime: string,
	totalTime: string,
	serves: number,
	createdAt: date,
	updatedAt: date,
	author: FirebaseId,
};
