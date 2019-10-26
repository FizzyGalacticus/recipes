// @flow
'use strict';

import React, { useState, useCallback } from 'react';

import FormControl from '@material-ui/core/FormControl';
import { default as MaterialSelect } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

type Props = {
	id?: String,
	name?: String,
	label?: String,
	onChange: Event => void,
	value: any,
	items: Array<String | Number>,
	fullWidth?: Boolean,
};

let instances = 0;

const Select = (props: Props) => {
	const { id, name, onChange, value, label, items = [], fullWidth, ...rest } = props;

	const instance = ++instances;

	const instanceId = `select-wrapper-instance-${instance}`;

	const [open, setOpen] = useState(false);

	const handleOpenClose = useCallback((shouldBeOpen: Boolean) => () => setOpen(shouldBeOpen), [setOpen]);

	const handleChange = useCallback((e: Event) => onChange({ target: { id, name, value: e.target.value } }), [
		id,
		name,
		onChange,
	]);

	return (
		<FormControl style={{ width: fullWidth ? '100%' : 'auto' }}>
			{label ? (
				<InputLabel shrink htmlFor={instanceId}>
					{label}
				</InputLabel>
			) : null}
			<MaterialSelect
				id={instanceId}
				open={open}
				onClose={handleOpenClose(false)}
				onOpen={handleOpenClose(true)}
				onChange={handleChange}
				inputProps={{ id, name }}
				value={value}
				label={label}
				name={name}
				fullWidth={fullWidth}
				{...rest}
			>
				{items.map((item, idx) => (
					<MenuItem key={`${instanceId}-item-${idx}`} value={item}>
						{item}
					</MenuItem>
				))}
			</MaterialSelect>
		</FormControl>
	);
};

export default Select;
