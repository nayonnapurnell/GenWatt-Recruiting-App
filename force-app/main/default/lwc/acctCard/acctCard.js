import { LightningElement,api,wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { refreshApex } from '@salesforce/apex';

export default class AcctCard extends LightningElement {
   // @api recordId;
    @api acctId;
    @api acctName;
    @api annualRevenue;
    @api phone;
    @api idx;

    //Contact Fields
    @api FirstName;
    @api LastName;

    selectedId;
    showContacts = false;
    records;
    contacts = [];
    results;

    get ranking(){
        return this.idx + 1;
    }

   

//method that stores the custom event
acctSelected(){

const acctSelected = new CustomEvent('acctcustomevent', {detail: {acctId: this.acctId, acctName: this.acctName, idx: this.idx}});

console.log('Test');
console.log('The current account Id and account name  is:' + this.acctId + ' ' + this.acctName + this.idx);

// dispatch my custom event
this.dispatchEvent(acctSelected);

}// end of the acctSelected custom event


handleChange(event) {
    if(this.showContacts){
        this.showContacts = false;
    }else{
        //invoke getContacts Apex method
        getContacts( { accountId: this.acctId} )
        .then((data) => {
            console.log(data);
            this.contacts = data;
            this.showContacts = true;
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(()=> {
            console.log('Finally got contacts...');
        });

    }
}   
  

  refreshRecords(){
    refreshApex(this.results);
}

}