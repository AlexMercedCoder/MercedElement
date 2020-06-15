# MercedElement

## By Alex Merced of AlexMercedCoder.com

![mui](https://i.imgur.com/Jp894lv.png)

If you just wants a simpler way to create Web Components, try out simple components at https://github.com/AlexMercedCoder/simpleComponents_

If you want all the UI tools that Alex Merced has created get the full MercedUI liberary here: https://github.com/AlexMercedCoder/MercedUI

CDN Link: http://www.alexmercedcoder.com/mercedEl.js
Youtube Tutorials: https://www.youtube.com/playlist?list=PLY6oTPmKnKbYrP3DfCUTYYADu0IT9DRZZ

## About

MercedElement is a class that simplifies working with the native HTMLElement class in javascript giving the user access to reactive state, props, reducer/dispatch and global state.

## Classes

### MercedElement

MercedElement is a base class for creating components. In the constructor use the super to define the template builder function, state, and reducer. Afterwards use the MercedElement.makeTag(name, class) static function to register the HTML tag

```
class TestTest extends MercedElement {
    constructor() {
        super(
            (state, props) => { // Argument 1: The Build Function
                return `<h1>${state.hello}</h1><h2>${props.user}</h2>`;
            },

            { hello: 'Hello World' }, //Argument 2: The Initial State

            (oldstate, payload) => { //Argument 3: Reducer Function (think redux)
                if (payload.action === 'goodbye') {
                    return { hello: 'goodbye' };
                }
            }
        );
    }
}

MercedElement.makeTag('test-test', TestTest);
```

in HTML

```
<test-test user="joe"></test-test>
```

#### Instance methods

instance.build() - captures the current props and state and renders a template

instance.setState(newState) - updates the components state and runs build

instance.dispatch(payload) - updates the state by running the reducer defined in the constructor

#### Static methods

MercedElement.gRegister(classInstance) - registers a component instance with the global state

MercedElement.clearRegister() - removes all components from global registry

MercedElement.gSetState(newState) - set the global state and re-render all registered components

MercedElement.gDispatch(reducer, payload) - update the global state with the given reducer function and payload, then re-render all registered components

MercedElement.makeTag(name, class) - register your custom components with HTML tags, the name must have a dash like ('hello-world')

#### LifeCycle Functions

Outside the constructor just override the same functions used in the native web components api.

connectedCallback(){} => Runs when components mounted

disconnectedCallback(){} => Runs when component is removed from dom

postBuild(){} => function that runs after every render, great for adding event listeners, not for setting state

_read JavaScript Documentation regarding adoptedCallback and attributeChangedCallback_

### FormTool

This is a class whose constructor takes a form element and allows you to grab the form data and clear the form with each.

**this.grabValues()** returns object with form values with name property as keys

**this.clearForm()** clears all form Values

**this.fillFields(object)** takes object fills in the form fields where key matches input name property

```
const form = document.querySelector('form');

const testForm = new FormTool(form);
```

```
<form id="myform">
    <input type="text" name="one" />
    <input type="text" name="two" />
    <input type="text" name="three" />
    <textarea name="four"></textarea>
</form>
<button onclick="console.log(testForm.grabValues())">Form Data</button>
<button onclick="testForm.clearForm()">Clear Values</button>
```

FormTool has two methods, grabValues() which will return you an object with the forms values using the name property as the key and the value property as the value. The second method is clearForm which will render the property of value of all form elements to null. Won't grab or clear the value on submit inputs but will for all others.

## Functions

### getQueryHash

_getQueryHash()_
This function will return an array, the first element being an object with all URL queries, the second being any URL hashes that may exist.

```
const [queries, hash] = getQueryHash()
```

### captureProps

_captureProps(element)_
Pass in any html element and this function returns all of its properties as an object.
