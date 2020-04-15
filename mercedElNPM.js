//////////////////////////////
//MercedElement Library by Alex Merced of AlexMercedCoder.com
/////////////////////////////

//////////////
//CaptureProps
/////////////

const captureProps = (element) => {
    const att = [...element.attributes];
    const entries = att.map((value) => {
        return [value.name, value.value];
    });

    return Object.fromEntries(entries);
};

//////////////////
//MercedElement
/////////////////

class MercedElement extends HTMLElement {
    constructor(builder, state, reducer) {
        super();
        this.builder = builder;
        this.state = state;
        this.reducer = reducer;
        this.props = {};
        this.attachShadow({ mode: 'open' });
        this.build();
    }

    build() {
        this.props = captureProps(this);
        this.shadowRoot.innerHTML = this.builder(this.state, this.props);
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.build();
    }

    dispatch(payload) {
        this.setState(this.reducer(this.state, payload));
    }

    static gState = {};

    static gRegistry = [];

    static gRegister(element) {
        this.gRegistry.push(element);
    }

    static clearRegister() {
        this.gRegistry = [];
    }

    static gSetState(newState) {
        this.gState = newState;
        this.gRegistry.forEach((value) => {
            value.setState(this.gState);
        });
    }

    static gDispatch(reducer, payload) {
        this.gSetState(reducer(this.gState, payload));
    }

    static makeTag(name, element) {
        window.customElements.define(name, element);
    }
}

////////////////////////////
// FormTool
////////////////////////////

class FormTool {
    constructor(form) {
        this.form = form;
        this.fields = [...this.form.children].filter((value) => {
            return (
                (value.tagName === 'INPUT' || value.tagName === 'TEXTAREA') &&
                value.type != 'submit'
            );
        });
    }

    grabValues() {
        const entries = this.fields.map((value) => {
            return [value.name, value.value];
        });
        return Object.fromEntries(entries);
    }

    fillFields(object) {
        const keys = Object.keys(object);
        const values = Object.values(object);
        keys.forEach((key) => {
            this.fields.forEach((field) => {
                if (field.name === key) {
                    field.value = object[key];
                }
            });
        });
    }

    clearForm() {
        const entries = this.fields.forEach((value) => {
            value.value = null;
        });
    }
}

////////////////////////////
// getQueryHash
////////////////////////////

const getQueryHash = () => {
    const hash = window.location.href.split('#')[1];

    const queryArray1 = window.location.href
        .split('?')[1]
        .split('#')[0]
        .split('&');

    const queryEntries = queryArray1.map((value) => {
        return value.split('=');
    });

    return [Object.fromEntries(queryEntries), hash];
};

module.exports = {
    MercedElement,
    captureProps,
    getQueryHash,
    FormTool,
};
