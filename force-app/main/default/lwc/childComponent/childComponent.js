import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {

    // public properties
    @api childName;
    @api age;

    childSaid = false; // private property to bind to the value of the input

    // create a method that dispatches a custom event to the parent component
    respondToParent(){
        this.childSaid = !this.childSaid;

        // create a custom event
        const myEvent = new CustomEvent('crying', {detail: this.childSaid});

        // dispatch my custom event
        this.dispatchEvent(myEvent);
    }




    //constructor
    constructor(){
        super();
        console.log('Child component fired ...');
    }

    //connectedCallback fires when component inserted into the DOM
    connectedCallback(){
        console.log('child component connectedCallback fired...');
    }

    // fires when component is removed from the DOM
    disconnectedCallback(){
        console.log('Child component disconnectedCallback fired...');
    }

    //renderedCallback fires when component has finished rendering
    renderedCallback(){
        console.log('Child component renderedCallback fired....');
    }
}