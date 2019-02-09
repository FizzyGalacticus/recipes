import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import firebase from '../lib/firebase';

class ButtonAppBar extends React.Component {
	constructor(props) {
		super(props);

		const auth = firebase.getAuth();

		this.state = {
			auth,
			loggedIn: auth !== null,
		};

		this.login = this.login.bind(this);
	}

	async login() {
		try {
			await firebase.login();
			this.setState({ loggedIn: true });
		} catch (err) {
			// Do nothing
		}
	}

	render() {
		return (
			<AppBar position="static">
				<Grid container>
					<Grid item xs={11} />
					<Grid item xs={1}>
						{this.state.loggedIn ? (
							<Button color="inherit">Logout</Button>
						) : (
							<Button color="inherit" onClick={this.login}>
								Login
							</Button>
						)}
					</Grid>
				</Grid>
				{/* <Toolbar /> */}
			</AppBar>
		);
	}
}

export default ButtonAppBar;
