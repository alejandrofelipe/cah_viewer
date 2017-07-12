import React from 'react';
import $ from 'jquery';

export default class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedColor: 'all',
			selectedExpansion: 'all'
		}
	}

	componentDidMount() {
		let _menu = this.__menuColor;
		let _this = this;
		$(_menu).find('> .item').on('click', function () {
			$(_menu).find('> .item').removeClass('active');
			$(this).addClass('active');
			_this.setState({selectedColor: $(this).data('color')});
		});
	}

	render() {
		return (<div className="ui inverted segment null">
			<div className="ui grid">
				<div className="four wide column">
					<h2><i className="icon server"/>Cards Against</h2>
				</div>
				<div className="twelve wide column">
					<div className="ui pointing menu" ref={r => this.__menuColor = r}>
						<a className="active item" data-color="all">
							<i className="clone icon"/> Todas
						</a>
						<a className="item" data-color="white">
							<i className="square outline icon"/> White
						</a>
						<a className="item" data-color="black">
							<i className="square icon"/> Black
						</a>
						<div className="right menu">
							<div className="item">
								<div className="ui transparent icon input">
									<input type="text" placeholder="Search..."/>
									<i className="search link icon"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="ui grid">
				<div className="four wide column">
					<div className="ui vertical pointing menu">
						<a className="active item">Todas</a>
					</div>
				</div>
				<div className="twelve wide column">
					<div className="ui segment c-cards">
						<p>{this.state.selectedColor} - {this.state.selectedExpansion}</p>
					</div>
				</div>
			</div>
		</div>);
	}
}
