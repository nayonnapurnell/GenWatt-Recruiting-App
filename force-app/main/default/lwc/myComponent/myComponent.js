import { LightningElement } from 'lwc';

export default class MyComponent extends LightningElement {

//private boolean property
showContacts = false;


//Creating a property named contacts
contacts = [
    {Id: '111' , Name: 'John', Title: 'VP'},
    {Id: '222' , Name: 'Dagny', Title: 'SVP'},
    {Id: '333' , Name: 'Henry', Title: 'President'}
];

// create a method to toggle the boolean property showContacts

toggleView(){
    // invert the boolean value
    this.showContacts = !this.showContacts;
}


}