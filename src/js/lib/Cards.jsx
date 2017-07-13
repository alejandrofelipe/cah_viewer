import Store from 'electron-store';
import objectId from 'bson-objectid';
// import _ from 'underscore';

/**
 * Card management class
 *
 * @class Cards
 * @since 1.0.0
 * @requires sindresorhus/electron-store
 * @property {Store} _conf - Persistence object. (See <a href="https://github.com/sindresorhus/electron-store">sindresorhus/electron-store</a>)
 */
export class Cards {

	constructor() {
		this._conf = new Store();
	}

	/**
	 * Get a Card by ID or return <code>null</code>
	 *
	 * @param {object} id - Card's ID
	 *
	 * @return {Card|null}
	 */
	get(id) {
		id.toString();
		return null;
	}

	/**
	 * Find cards with matching properties
	 * @param {object} filter -
	 * @param {string} filter.text - Text of a card, using <code>contains</code> (<code>%s%</code>)
	 * @param {string} filter.type - Type of a card
	 * @param {string} filter.expansion - Expansion of a card
	 * @return {Card[]}
	 */
	find(filter) {
		filter = filter || [];
		return filter;
	}

	/**
	 * @return {Card[]}
	 */
	list() {

	}

	/**
	 * Add a card
	 * @param {Card} card
	 * @return {boolean}
	 */
	addCard(card) {
		return false;
	}

	/**
	 * Remove a card
	 * @param {string} id
	 * @return {boolean}
	 */
	removeCard(id) {
		return id;
	}
}

/**
 * Card class
 *
 * @class Card
 * @since 1.0.0
 * @param {string} text
 * @param {string} type
 * @param {string} expansion
 *
 * @property {string} id
 * @property {string} text
 * @property {string} type
 * @property {string} expansion
 * @property {number} created
 * @property {number} modified
 */
export class Card {
	constructor({text, type, expansion} = {}) {
		this.id = objectId();
		this.text = text;
		this.type = type;
		this.expansion = expansion;
		this.modified = this.created = Date.now();
	}

	toJson() {
		let {id, text, type, expansion, created, modified} = this;
		return {id, text, type, expansion, created, modified};
	}
}

export default new Cards();
