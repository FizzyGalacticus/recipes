// @flow
'use strict';

import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InstructionMaker from './InstructionsMaker';

/*
name: Joi.string(),
picture_urls: Joi.array().items(Joi.string()),
author_id: Joi.number(),
ingredients,
instructions: Joi.array().items(instructions),
tags: Joi.array().items(Joi.number()),
public: Joi.boolean(),
created_at: Joi.date(),
updated_at: Joi.date(),
*/

type Props = {
	authorId: Number,
};

// type State = {
// 	name: String,
// 	instructions: Array<Array<RecipeInstruction>>,
// 	public: Boolean,
// };

const CreateRecipePage = (props: Props) => {
	const { authorId } = props;

	const [state, setState] = useState({});
	const [totalTime, setTotalTime] = useState(0);

	useEffect(() => {
		if (state && state.instructions) {
			const time = state.instructions.reduce(
				(acc1, set) => set.reduce((acc2, i) => (acc2 + isNaN(i.approxTime) ? 0 : Number(i.approxTime)), 0),
				0
			);

			setTotalTime(time);
		}
	}, [state.instructions, setTotalTime]);

	const onChange = useCallback(
		e => {
			const {
				target: { name, value },
			} = e;

			setState({ ...state, [name]: value });
		},
		[state, setState]
	);

	const showState = useCallback(() => {
		alert(JSON.stringify({ authorId, state }, null, 4));
	}, [state, authorId]);

	return (
		<Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
			<Grid item xs={6}>
				<Grid container spacing={16}>
					<Grid item xs={12}>
						<Typography variant="h3">Create Recipe</Typography>
					</Grid>
					<Grid item xs={12}>
						<Grid container alignItems="flex-end">
							<Grid item xs={4}>
								<TextField label="Name" name="name" onChange={onChange} />
							</Grid>
							<Grid item xs={2}>
								<Typography style={{ display: 'inline' }} component="span">
									{totalTime}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" gutterBottom>
							Instructions
						</Typography>
						<InstructionMaker name="instructions" onChange={onChange} />
					</Grid>
					<Grid item xs={12}>
						<Button onClick={showState}>Show State</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default withRouter(connect(store => ({ authorId: store.authReducer.user.id }))(CreateRecipePage));
