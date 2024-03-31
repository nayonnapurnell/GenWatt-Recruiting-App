import { LightningElement, wire } from 'lwc';
import AccountMC from '@salesforce/messageChannel/AccountMessageChannel__c';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AcctDetail extends LightningElement {

    accountId;          // property to hold the Account ID received from the message channel
    accountName;        // property to hold the Account Name received from the message channel
    subscription = [];  // property to hold the subscription object returned from subscribe

    // getter method to display a label in the Detail component
    get detailLabel(){
        return 'Details for ' + this.accountName;
    }

    // create the MessageContext object
    @wire(MessageContext)
    msgContext;

    // create a method to subscribe to the message channel
    subscribeToMessageChannel(){
        // use the subscribe method to subscribe to the AccountMessageChannel and store the returned subscription object into my property
        this.subscription = subscribe(this.msgContext, AccountMC, (message)=> this.handleMessage(message));

    } // End of the subscribeToMessageChannel method

    // create a method to unsubscribe from the message channel
    unsubscribeFromMessageChannel(){
        unsubscribe(this.subscription);

    } // End of the unsubscribeToMessageChannel method

    // method to handle the message channel message when received
    handleMessage(message){
        console.log('Handle Message Method' + message);
        this.accountId = message.recordId;
        this.accountName = message.accountName;
    }  // End of the handleMessage method

    connectedCallback(){
        this.subscribeToMessageChannel();
    } // end of the connectedCallback

    disconnectedCallback(){
        this.unsubscribeFromMessageChannel();
    } // end of the disconnectedCallback

    detailSaved(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Account Updated',
            message: 'Account ' + event.detail.fields.Name.value + ' was successfully updated!',
            variant: 'success',
            mode: 'dismissible'
        }));
        
    } 

} // end of the acctDetail.js class