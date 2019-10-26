// @flow
'use strict';

import React, { useState, useCallback } from 'react';

import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

import Select from '../../components/common/Select';

const convert = require('convert-units');
const timePossibilities = convert().possibilities('time');

type Props = {
	name: String,
	onChange: Function,
};

const getIds = (i, j, obj = {}) => {
	const idBase = `instruction-${i}-${j}`;

	const ret = { idBase };

	Object.keys(obj).forEach(key => (ret[`${key}Id`] = `${idBase}-${key}`));

	return ret;
};

let instructionInstances = 0;

const InstructionMaker = (props: Props) => {
	const { name, onChange } = props;

	const [instructions, setInstructions] = useState([[]]);

	const addInstruction = useCallback(() => {
		const [set] = instructions;

		setInstructions([[...set, { text: '', instance: ++instructionInstances }]]);
	}, [instructions, setInstructions]);

	const instructionChanged = useCallback(
		e => {
			const {
				target: { id, value },
			} = e;

			const [i, j, n] = id.split('-').slice(1);

			const oldInstruction = instructions[i][j];
			const newInstruction = { ...oldInstruction, [n]: value };

			const newInstructions = [...instructions];
			newInstructions[i] = [...newInstructions[i]];
			newInstructions[i][j] = newInstruction;

			setInstructions(newInstructions);
			onChange({ target: { name, value: newInstructions } });
		},
		[name, onChange, instructions, setInstructions]
	);

	const deleteInstruction = useCallback(
		(i, j) => () => {
			const newInstructions = [...instructions];
			newInstructions[i] = [...newInstructions[i]];

			newInstructions[i].splice(j, 1);

			setInstructions(newInstructions);
		},
		[instructions, setInstructions]
	);

	return (
		<Grid container>
			<Grid item xs={12}>
				<Grid container spacing={8}>
					{instructions.map((instructionSet, i) =>
						instructionSet.map(({ text = '', approxTime, timeUnit, instance }, j) => {
							const { idBase, textId, approxTimeId, timeUnitId } = getIds(i, j, {
								text,
								approxTime,
								timeUnit,
							});

							const key = `${idBase}-${i}-${j}-${instance}`;
							return (
								<Grid key={key} item xs={12}>
									<Grid container spacing={8} alignItems="flex-end">
										<Grid item xs={3}>
											<TextField
												id={textId}
												defaultValue={text}
												onChange={instructionChanged}
												label="Instruction"
												multiline
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												id={approxTimeId}
												defaultValue={approxTime}
												onChange={instructionChanged}
												type="number"
												label="Time"
											/>
										</Grid>
										<Grid item xs={3}>
											<Select
												id={timeUnitId}
												label="Time Unit"
												value={timeUnit}
												items={timePossibilities}
												onChange={instructionChanged}
												fullWidth={true}
											></Select>
										</Grid>
										<Grid item xs={3}>
											<Fab color="secondary" onClick={deleteInstruction(i, j)}>
												<DeleteIcon />
											</Fab>
										</Grid>
									</Grid>
								</Grid>
							);
						})
					)}
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Button onClick={addInstruction}>Add Instructions</Button>
			</Grid>
		</Grid>
	);
};

export default InstructionMaker;
