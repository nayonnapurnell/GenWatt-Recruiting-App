import { LightningElement,api,wire } from 'lwc';
import getTopAccounts from '@salesforce/apex/AccountController.getTopAccounts';
import { getRecord } from 'lightning/uiRelatedListApi';
import RecordModal from 'c/recordModal'; // import my custom recordModal component
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import AccountMC from '@salesforce/messageChannel/AccountMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService';

import { refreshApex } from '@salesforce/apex';

export default class AcctList extends LightningElement {
    @api recordId;
    Id;
    Name;
    selectedId; // property to hold the selected Account ID
    selectedName; // property to hold the selected Account Name
    showForm = false;
    idx;


    accts = []; //This will be the property to hold the account records.
    results; //property to hold the object that is provisioned from the wire service
    acctsToDisplay = false; //property to determine if we have accts records returned

   
    // use the wire service to create a MessageContext object required by the publish method
    @wire(MessageContext)
    msgContext;


    @wire(getTopAccounts)
    wireAccounts(acctRecords){

        this.results = acctRecords;


        if(this.results.data){
            this.accts = this.results.data;
            this.acctsToDisplay = true;
            this.selectedId = this.accts[0].Id;
            this.selectedName = this.accts[0].Name;
            this.sendMessageService(this.selectedId, this.selectedName);
            
            console.log(this.results.data);

        }

        if(this.results.error){
            console.error('Error retrieving Accounts...');
            this.acctsToDisplay = false;
        }

    }

   // method to handle the onclick option for the modal to create a new account.
    // create a method that a user can invoke to pen the recordModal component and edit the opportunity record
createAcct(){
    // open the modal window 
    RecordModal.open({
         size: 'small',
         recordId: this.recordId,
         objectApiName: 'Account',
         formMode: 'create',
         layoutType: 'Compact',
         headerLabel: 'Create Account'
    })
    .then((result)=> {
         console.log(result);
         // check to see how the modal window was closed
         if (result){
              // check to see if the result is a success, and is so, dispatch a toast event notification
              if (result.type === 'success'){

                   const myToastEvent = new ShowToastEvent({
                        title: 'Account Saved Successfully',
                        message: 'This account ' + result.detail.fields.Name.value + ' was saved successfully!',
                        variant: 'success',
                        mode: 'dismissible'
                   });
                   this.refreshRecords();

                   // dispatch the toast notification
                   this.dispatchEvent(myToastEvent);
              }
         }
    })
    .catch((error)=> console.error(error));
}



 handleAcctEvent(event){
        this.Id = event.detail.acctId;
        this.Name = event.detail.acctName;
        
    }

    refreshRecords(){
        refreshApex(this.results);
    }

    // create a method to publish the account ID and Name to the message channel
    sendMessageService(acctId, acctName){
        // invoke the publish method to publish the account info to the message channel
        publish(this.msgContext, AccountMC, {recordId: acctId, accountName: acctName});
        console.log('Published');
    }

    // create a method to handle the selected event raised by the acctCard
    handleSelection(event){
    this.selectedId = event.detail.acctId;
    this.selectedName = event.detail.acctName;

    //invoke the message service
    this.sendMessageService(this.selectedId, this.selectedName);
    }
    
}// end of acctList.js