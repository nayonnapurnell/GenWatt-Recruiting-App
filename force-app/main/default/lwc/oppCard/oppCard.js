import { LightningElement, api } from 'lwc';
import RecordModal from 'c/recordModal'; // import my custom recordModal component
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class OppCard extends NavigationMixin(LightningElement) {

@api oppName;
@api oppId;
@api stageName;
@api oppAmount; 
@api closeDate;

// create a method to navigate to the full opportunity record page for the current opp
viewRecord(){
     // make a call to the Navigate method from NavigationMixin and pass in some parameters and attributes
     this[NavigationMixin.Navigate]({
          type: 'standard__recordPage',
          attributes: {
               recordId: this.oppId,
               actionName: 'view'     
          }
     });
}


oppSelected(){
     // create a custom event
     const oppSelected = new CustomEvent('oppcustomevent', {detail: {oppId: this.oppId, oppName: this.oppName}});

     // dispatch my custom event
     this.dispatchEvent(oppSelected); 
     this.viewRecord();   
}

// create a method that a user can invoke to pen the recordModal component and edit the opportunity record
editOpp(){
     // open the modal window 
     RecordModal.open({
          size: 'small',
          recordId: this.oppId,
          objectApiName: 'Opportunity',
          formMode: 'edit',
          layoutType: 'Compact',
          headerLabel: 'Edit Opportunity'
     })
     .then((result)=> {
          console.log(result);
          // check to see how the modal window was closed
          if (result){
               // check to see if the result is a success, and is so, dispatch a toast event notification
               if (result.type === 'success'){

                    const myToastEvent = new ShowToastEvent({
                         title: 'Opportunity Saved Successfully',
                         message: 'This opportunity ' + result.detail.fields.Name.value + ' was saved successfully!',
                         variant: 'success',
                         mode: 'dismissible'
                    });

                    // dispatch the toast notification
                    this.dispatchEvent(myToastEvent);
               }
          }
     })
     .catch((error)=> console.error(error));
}



}// End of the OppCard JS file