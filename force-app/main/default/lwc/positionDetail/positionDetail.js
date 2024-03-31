import { LightningElement, wire } from 'lwc';
import PositionMC from '@salesforce/messageChannel/PositionMessageChannel__c';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class PositionDetail extends LightningElement {

    positionId;
    positionName;
    subscription = [];  // property to hold the subscription object returned from subscribe


     // getter method to display a label in the Detail component
     get detailLabel(){
        return 'Details for ' + this.positionName;
    }

    // create the MessageContext object
    @wire(MessageContext)
    msgContext;

     // create a method to subscribe to the message channel
     subscribeToMessageChannel(){
        // use the subscribe method to subscribe to the AccountMessageChannel and store the returned subscription object into my property
        this.subscription = subscribe(this.msgContext, PositionMC, (message)=> this.handleMessage(message));

    } // End of the subscribeToMessageChannel method

    // create a method to unsubscribe from the message channel
    unsubscribeFromMessageChannel(){
        unsubscribe(this.subscription);

    } // End of the unsubscribeToMessageChannel method

     // method to handle the message channel message when received
     handleMessage(message){
        
        this.positionId = message.recordId;
        this.positionName = message.positionName;
    }  // End of the handleMessage method

    connectedCallback(){
        this.subscribeToMessageChannel();
    } // end of the connectedCallback

    disconnectedCallback(){
        this.unsubscribeFromMessageChannel();
    } // end of the disconnectedCallback

    detailSaved(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Position Updated',
            message: 'Position ' + this.positionName + ' was successfully updated!',
            variant: 'success',
            mode: 'dismissible'
        }));
        
    } 


}