import { LightningElement } from 'lwc';
// import generateData from './generateData';

// const columns = [
//     { label: 'Label', fieldName: 'name' },
//     { label: 'Website', fieldName: 'website', type: 'url' },
//     { label: 'Phone', fieldName: 'phone', type: 'phone' },
//     { label: 'Balance', fieldName: 'amount', type: 'currency' },
//     { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
// ];

export default class BasicDatatable extends LightningElement {
    // friend = 'New User';
    // data = [];
    // columns = columns;

    // connectedCallback() {
    //     const data = generateData({ amountOfRecords: 100 });
    //     this.data = data;
    // }

    childSpeak;  //property to hold the value passed in the crying event

    // create handler method for crying event
    handleFit(event){
        console.log(event);

        // move the data in the detail property of the event into my property displayint in the UI
        this.childSpeak = event.detail;
    }

     //constructor
     constructor(){
        super();
        console.log('Parent component fired ...');
    }

    //connectedCallback fires when component inserted into the DOM
    connectedCallback(){
        console.log('Parent component connectedCallback fired...');
    }

    // fires when component is removed from the DOM
    disconnectedCallback(){
        console.log('Parent component disconnectedCallback fired...');
    }

    //renderedCallback fires when component has finished rendering
    renderedCallback(){
        console.log('Parent component renderedCallback fired....');
    }



}