import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

import { toggleNav } from '../../lib/redux/actions/menu';
import { routes } from '../../routes';

export default connect(state => {
	const {
		menuReducer: { open },
	} = state;

	return { open };
})(
	withRouter(({ dispatch, open, history }) => (
		<Drawer open={open} anchor="left" variant="persistent" style={{ zIndex: -1 }}>
			<List>
				<div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', justifyContent: 'flex-end' }}>
					<IconButton onClick={() => dispatch(toggleNav())}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				{routes.map(route => (
					<ListItem
						key={route.path}
						onClick={() => {
							history.push(route.path);
							dispatch(toggleNav());
						}}
						button
					>
						{route.name}
					</ListItem>
				))}
			</List>
		</Drawer>
	))
);
