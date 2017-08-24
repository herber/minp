import test from 'ava';
import P from '.';

test('Single catch', t => {
	t.plan(1);

	const fn = () => new P((resolve, reject) => {
		reject('1c');
	});

	fn().catch((a) => {
		t.is(a, '1c');
	})
});

test('Single then', t => {
	t.plan(1);

	const fn = () => new P((resolve, reject) => {
		resolve('1t');
	});

	fn().then((a) => {
		t.is(a, '1t');
	})
});

test('Multiple catches', t => {
	t.plan(3);

	const fn = () => new P((resolve, reject) => {
		reject('1c');
	});

	fn().catch((a) => {
		t.is(a, '1c');
		return '2c';
	}).catch((a) => {
		t.is(a, '2c');
		return '3c';
	}).catch((a) => {
		t.is(a, '3c');
	})
});

test('Multiple thens', t => {
	t.plan(3);

	const fn = () => new P((resolve, reject) => {
		resolve('1t');
	});

	fn().then((a) => {
		t.is(a, '1t');
		return '2t';
	}).then((a) => {
		t.is(a, '2t');
		return '3t';
	}).then((a) => {
		t.is(a, '3t');
	})
});

test('Mixed #1', t => {
	t.plan(5);

	const fn = (y) => new P((resolve, reject) => {
		if (y) {
	    resolve('then');
	  } else {
	    reject('catch');
	  }
	});

	const tests = (b) => {
		fn(b).then((a) => {
			t.is(a, 'then');
			return 'then2';
		}).catch((a) => {
			t.is(a, 'catch');
			return 'catch2';
		}).then((a) => {
			t.is(a, 'then2');
			return 'then3';
		}).then((a) => {
			t.is(a, 'then3');
		}).catch((a) => {
			t.is(a, 'catch2');
		});
	};

	tests(true);
	tests(false);
});

test('Mixed #2', t => {
	t.plan(5);

	const fn = (y) => new P((resolve, reject) => {
		if (y) {
	    resolve('then');
	  } else {
	    reject('catch');
	  }
	});

	const tests = (b) => {
		fn(b).then((a) => {
			t.is(a, 'then');
			return 'then2';
		}).catch((a) => {
			t.is(a, 'catch');
			return 'catch';
		}).then((a) => {
			t.is(a, 'then2');
			return 'then3';
		}).catch((a) => {
			t.is(a, 'catch');
			return 'catch2';
		}).then((a) => {
			t.is(a, 'then3');
		});
	};

	tests(true);
	tests(false);
});

test('Multiple args then', t => {
	t.plan(6);

	const fn = (i, a, b, c) => new P((resolve, reject) => {
		if (i) {
	    resolve(a, b, c);
	  } else {
	    reject(a, b, c);
	  }
	});

	const tests = (i) => {
		fn(i, 'x', 'y', 'z').then((a, b, c) => {
			t.is(a, 'x');
			t.is(b, 'y');
			t.is(c, 'z');
		}).catch((a, b, c) => {
			t.is(a, 'x');
			t.is(b, 'y');
			t.is(c, 'z');
		});
	};

	tests(true);
	tests(false);
});

test('Throws exception if resolvable is not a function', t => {
	t.plan(1);

	const fn = () => new P('string');

	try {
		fn()
	} catch(err) {
		t.is(err.message, 'Promise resolver string is not a function');
	}
});
