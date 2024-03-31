import { LightningElement, api } from 'lwc';

export default class OppRecordForm extends LightningElement {
    @api recordId; // inherits the record Id from a record page
    @api objectApiName;  // inherits the Object API Name froma record page
    @api layoutType = 'Compact';
    @api mode = 'readonly';

    //recordFields = ['Name', 'StageName', 'Amount'];

    recordSaved(){ 
       this.mode = 'readonly';

        // create a custom event
        const myEvent = new CustomEvent('save', {detail: this.mode});

        // dispatch my custom event
        this.dispatchEvent(myEvent);
    }
}