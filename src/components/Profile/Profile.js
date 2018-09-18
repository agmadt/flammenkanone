import React, { Component } from 'react';
import { Grid, Menu, Segment, Message, Icon } from 'semantic-ui-react';

import MyProducts from './MyProducts';
import ChangeProfile from './ChangeProfile';

export default class Profile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeItem: 'bio',
			message: null
		}

		this.handleItemClick = this.handleItemClick.bind(this);
	}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
  	if (this.props.location.state !== undefined) {
  		this.setState({
  			activeItem: this.props.location.state.activeItem,
  			message: this.props.location.state.message
  		})
  	}
  }

	render() {

    const { activeItem } = this.state

		return (
			<React.Fragment>
				{ this.state.message
					? <div className='message-wrapper'>
					  	<Message negative>
					      <Icon name='exclamation' />
					      {this.state.message}
					    </Message>
				    </div>
			    : ''}
				<Grid container>
	        <Grid.Column width={3}>
	          <Menu pointing vertical>
			        <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
			        <Menu.Item
			          name='products'
			          active={activeItem === 'products'}
			          onClick={this.handleItemClick}
			        >My Products</Menu.Item>
			      </Menu>
	        </Grid.Column>

	        <Grid.Column stretched width={13}>
	          <Segment>
	            { this.state.activeItem === 'bio' ? <ChangeProfile /> : <MyProducts user={this.props.user} /> }
	          </Segment>
	        </Grid.Column>
	      </Grid>
			  <style>{`
			  	.message-wrapper { padding: 10px 10px; width: 100%; }
	  		`}</style>
			</React.Fragment>
		);
	}
}
