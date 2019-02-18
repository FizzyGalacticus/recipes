import React, { Component } from 'react';

import MUISnackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const instance = {
	setState: () => {},
};

export const showNotification = ({ message, duration = 3000, variant = 'info' }) => {
	let backgroundColor;
	let icon;

	switch (variant) {
		case 'success':
			backgroundColor = green[600];
			icon = CheckCircleIcon;
			break;
		case 'error':
		case 'danger':
			backgroundColor = amber[600];
			icon = ErrorIcon;
			break;
		case 'warn':
		case 'warning':
			backgroundColor = orange[600];
			icon = WarningIcon;
			break;
		case 'info':
		default:
			backgroundColor = blue[600];
			icon = InfoIcon;
	}

	instance.setState({ open: true, message, duration, backgroundColor, icon });
};

export default class Snackbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			message: 'This is the default message.',
			duration: 3000,
			backgroundColor: blue,
			icon: InfoIcon,
		};

		instance.setState = this.setState.bind(this);

		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		this.setState({ open: false });
	}

	render() {
		const Icon = this.state.icon;

		return (
			<MUISnackbar
				open={this.state.open}
				autoHideDuration={this.state.duration}
				onClose={this.handleClose}
				message={this.state.message}
			>
				<SnackbarContent
					style={{ backgroundColor: this.state.backgroundColor }}
					message={
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							{this.state.message}
							<Icon color="inherit" />
						</span>
					}
					action={[
						<IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</MUISnackbar>
		);
	}
}
