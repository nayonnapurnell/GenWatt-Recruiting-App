import { LightningElement, api, wire } from 'lwc';
import {getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class GetRecordForm extends LightningElement {

// public property to inherit the record ID from the page
@api recordId;

// use the wire decorator to decorate a property to hold the response from the wire service
@wire(getRecord, {recordId: '$recordId', fields: [NAME_FIELD,TITLE_FIELD, PHONE_FIELD, EMAIL_FIELD]}) 
contact; //The response is stored here in the contact property.  It will be holding an object once the wire service is done.

// getter methods to return field values
get name(){
    return this.contact.data.fields.Name.value;
}

get title(){
    return this.contact.data.fields.Title.value;
}

get phone(){
    return this.contact.data.fields.Phone.value;
}

get email(){
    return this.contact.data.fields.Email.value;
}

renderedCallback(){
    console.log(this.contact);
}

}// End of the getRecordForm.js