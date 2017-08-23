module.exports = class {
	constructor(fn) {
		if (typeof fn !== 'function') throw new Error('Resolvable must be a function.');

		const toArray = array => {
		  if (array instanceof Array) return array;
		  return [array];
		};

		const _then = (use, ...input) => (fn) => {
			const r = toArray(use ? fn(...input) : input);
			return { catch: _catch(!use, ...r), then: _then(use, ...r) };
		};

		const _catch = (use, ...input) => (fn) => {
			const r = toArray(use ? fn(...input) : input);
			return { catch: _catch(use, ...r), then: _then(!use, ...r) };
		};

		let rv = {};
		const resolve = (...args) => { rv = { then: _then(true, ...args), catch: _catch(false, ...args) } };
		const reject = (...args) => { rv = { then: _then(false, ...args), catch: _catch(true, ...args) } };

		fn(resolve, reject);

		return rv;
	}
};
