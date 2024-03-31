import { LightningElement, api } from 'lwc';
import RecordModal from 'c/recordModal'; // import my custom recordModal component
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


export default class CaseCard extends NavigationMixin(LightningElement) {
    
    @api caseId;
    @api caseNumber;
    @api caseSubject;
    @api caseStatus;
    @api casePriority;


// create a method to navigate to the full opportunity record page for the current opp
viewRecord(){
    // make a call to the Navigate method from NavigationMixin and pass in some parameters and attributes
    this[NavigationMixin.Navigate]({
         type: 'standard__recordPage',
         attributes: {
              recordId: this.caseId,
              actionName: 'view'     
         }
    });
}


//method that stores the custom event 
caseSelected(){
// create a custom event
const caseSelected = new CustomEvent('casecustomevent', {detail: {caseId: this.caseId, caseSubject: this.caseSubject}});

 // dispatch my custom event
 this.dispatchEvent(caseSelected);
 this.viewRecord();
}



// create a method that a user can invoke to pen the recordModal component and edit the case record
editCase(){
    // open the modal window 
    RecordModal.open({
         size: 'small',
         recordId: this.caseId,
         objectApiName: 'Case',
         formMode: 'edit',
         layoutType: 'Compact',
         headerLabel: 'Edit Case'
    })
    .then((result)=> {
        console.log(result);
        // check to see how the modal window was closed
        if (result){
             // check to see if the result is a success, and is so, dispatch a toast event notification
             if (result.type === 'success'){

                  const myToastEvent = new ShowToastEvent({
                       title: 'Case Saved Successfully',
                       message: 'This case ' + result.detail.fields.Subject.value + ' was saved successfully!',
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

} // end of the caseCard.js file