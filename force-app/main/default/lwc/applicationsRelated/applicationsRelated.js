import { LightningElement,wire } from 'lwc';
import PositionMC from '@salesforce/messageChannel/PositionMessageChannel__c';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';

export default class ApplicationsRelated extends LightningElement {

    applicationId;
    applicationName;
    subscription = [];
    positionId;
    positionName;

    applicationLabel;

    updateApplicationLabel(event){
        this.applicationLabel = 'Applications(' + event.detail + ')';
    }

     // getter method to display a label in the Detail component
     get detailLabel(){
        return 'Related Records for ' + this.positionName;
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
        console.log('Handle Message Method' + message);
        this.positionId = message.recordId;
        this.positionName = message.positionName;
        this.applicationId = message.recordId;
        this.applicationName = message.applicationName;

        console.log('Inside the Application Related.js - handleMessage(message)' + message.recordId);
        console.log('Inside the Application Related.js' + this.positionId);
        console.log('Application Related.js Position Name' + this.positionName);
        console.log('Application Related.js Position Name' + message.positionName);
    }  // End of the handleMessage method

    connectedCallback(){
        this.subscribeToMessageChannel();
    } // end of the connectedCallback

    disconnectedCallback(){
        this.unsubscribeFromMessageChannel();
    } // end of the disconnectedCallback

    detailSaved(event){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Application Updated',
            message: 'Application ' + event.detail.fields.Name.value + ' was successfully updated!',
            variant: 'success',
            mode: 'dismissible'
        }));
        
    } 

      // accordian event handling
      handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
}