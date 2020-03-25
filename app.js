const reducer = (oldstate, payload) => {
    if (payload.action === 'goodbye') {
        return { hello: 'goodbye' };
    }
};

const testBuilder = (state, props) => {
    return `<h1>${state.hello}</h1><h2>${props.user}</h2>`;
};

class TestTest extends MercedElement {
    constructor() {
        super(testBuilder, { hello: 'Hello World' }, reducer);
    }
}

MercedElement.makeTag('test-test', TestTest);

const test = document.getElementById('test');

MercedElement.gRegister(test);
