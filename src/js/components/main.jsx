import React from 'react';
import $ from 'jquery';

export default class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedType: 'all',
			selectedExpansion: 'all'
		};
	}

	componentDidMount() {
		let _menu = this.__menuColor;
		let _this = this;
		$(_menu).find('> .item').on('click', function () {
			$(_menu).find('> .item').removeClass('active');
			$(this).addClass('active');
			_this.setState({selectedType: $(this).data('type-card')});
		});

		$(this.__dropdownIE).dropdown();
	}

	render() {
		return (<div className="ui inverted segment null">
			<div className="ui grid top-content">
				<div className="four wide column">
					<h2><i className="icon server"/>Cards Against</h2>
				</div>
				<div className="twelve wide column">
					<div className="ui pointing menu" ref={r => this.__menuColor = r}>
						<a className="active item" data-type-card="all">
							<i className="clone icon"/> Todas
						</a>
						<a className="item" data-type-card="white">
							<i className="square outline icon"/> White
						</a>
						<a className="item" data-type-card="black">
							<i className="square icon"/> Black
						</a>
						<div className="right menu">
							<a className="item">
								<i className="plus icon"/> Adicionar
							</a>
							<div
								className="ui top right pointing compact dropdown icon item"
								ref={r => this.__dropdownIE = r}>
								<i className="wrench icon"/>
								<div className="menu">
									<a className="item"><i className="download icon"/> Importar </a>
									<a className="item"><i className="upload icon"/> Exportar </a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="ui grid main-content">
				<div className="four wide column">
					<div className="ui vertical pointing menu">
						<a className="active item">Todas</a>
					</div>
				</div>
				<div className="twelve wide column">
					<div className="ui segment c-cards">
						<p>{this.state.selectedType} - {this.state.selectedExpansion}</p>
					</div>
				</div>
			</div>
		</div>);
	}
}
