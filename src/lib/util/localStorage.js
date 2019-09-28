'use strict';

const wrapper = (fn = () => {}) => (...params) => {
	try {
		return fn(...params);
	} catch (err) {
		// Just eat it
	}
};

export const getItem = wrapper(key => JSON.parse(localStorage.getItem(key)));

export const setItem = wrapper((key, value) => localStorage.setItem(key, JSON.stringify(value)));

export const removeItem = wrapper(key => localStorage.removeItem(key));

export default {
	getItem,
	setItem,
	removeItem,
};
