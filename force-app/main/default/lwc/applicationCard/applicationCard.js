import { LightningElement, api } from 'lwc';
import getReviews from '@salesforce/apex/ReviewController.getReviews';
import { refreshApex } from '@salesforce/apex';
import RecordModal from 'c/recordModal'; // import my custom recordModal component
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class ApplicationCard extends NavigationMixin(LightningElement) {
    @api applicationId;
    @api applicationName;
    @api applicationStatus;
    @api applicationCandidate;
    @api numberOfReviews;
    @api reviewScore;
    @api idx;

    //Review Fields
    @api technicalSkills;
    @api culturalFit;
    @api businessSkills;
    @api recommendForHire;
    @api comments;
    @api Name;

    //Candidate Fields (Contact Object)
    @api contactId;
    @api contactName;
    @api candidateId;
    

    showReviews = false;
    records;
    reviews = [];
    results;

    // method that numbers the positions starting at 1.
    get ranking(){
        return this.idx + 1;
    }

   

    //method that stores the custom event for the application record
    applicationSelected(){
        const applicationSelected = new CustomEvent('applicationcustomevent', {detail: {applicationId: this.applicationId, applicationName: this.applicationName, idx: this.idx}});
        console.log('The current application Id and application name is: ' + this.applicationId + this.applicationName);
        // dispatch my custom event
        this.dispatchEvent(applicationSelected);
        this.viewRecord();   
    } // end of the positiontSelected custom event

     // create a method to navigate to the full application record page for the current position
     viewRecord(){
        // make a call to the Navigate method from NavigationMixin and pass in some parameters and attributes
        this[NavigationMixin.Navigate]({
             type: 'standard__recordPage',
             attributes: {
                  recordId: this.applicationId,
                  actionName: 'view'     
             }
        });
   }

   editApplication(){
    // open the modal window 
    RecordModal.open({
         size: 'small',
         recordId: this.applicationId,
         objectApiName: 'Application__c',
         formMode: 'edit',
         layoutType: 'Full',
         headerLabel: 'Edit Application'
    })
    .then((result)=> {
        console.log(result);
        // check to see how the modal window was closed
        if (result){
             // check to see if the result is a success, and is so, dispatch a toast event notification
             if (result.type === 'success'){

                  const myToastEvent = new ShowToastEvent({
                       title: 'Application Saved Successfully',
                       message: 'This application ' + result.detail.fields.Name.value + ' was saved successfully!',
                       variant: 'success',
                       mode: 'dismissible'
                  });

                  // dispatch the toast notification
                  this.dispatchEvent(myToastEvent);
             }
        }
   })
   .catch((error)=> console.error(error));
} // end of the editApplication method.

// Candidate Information

        //method that stores the custom event for the candidate record
        candidateSelected(){
            const candidateSelected = new CustomEvent('candidatecustomevent', {detail: {contactId: this.applicationCandidate, contactName: this.contactName, idx: this.idx}});
            console.log('The current candidate name is: ' + this.contactId + this.contactName);
            // dispatch my custom event
            this.dispatchEvent(candidateSelected);  
            this.viewCandidateRecord();
        } // end of the positiontSelected custom event


          // create a method to navigate to the full application record page for the current position
        viewCandidateRecord(){

        // make a call to the Navigate method from NavigationMixin and pass in some parameters and attributes
        this[NavigationMixin.Navigate]({
             type: 'standard__recordPage',
             attributes: {
                  recordId: this.candidateId,
                  actionName: 'view'     
             }
        });
   }


         // create a method to navigate to the full application record page for the current candidate
         editCandidate(){
        // open the modal window 
        console.log('***************');
        console.log(this.candidateId);
        RecordModal.open({
            size: 'small',
            recordId: this.candidateId,
            objectApiName: 'Contact',
            formMode: 'readonly',
            layoutType: 'Full',
            headerLabel: 'View Contact'
        })
        .then((result)=> {
            console.log(result);
            // check to see how the modal window was closed
            if (result){
                    // check to see if the result is a success, and is so, dispatch a toast event notification
                    if (result.type === 'success'){

                        const myToastEvent = new ShowToastEvent({
                            title: 'Contact Saved Successfully',
                            message: 'This contact ' + result.detail.fields.Name.value + ' was saved successfully!',
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








// Invoke the getReviews Apex Controller
handleChange(event) {
     if(this.showReviews){
         this.showReviews = false;
     }else{
         //invoke getContacts Apex method
         getReviews( { applicationId: this.applicationId} )
         .then((data) => {
          console.log('Review data' + data);
             console.log(data);
             this.reviews = data;
             this.showReviews= true;
             
         })
         .catch((err) => {
             console.error(err);
         })
         .finally(()=> {
             console.log('Finally got reviews...');
         });
 
     }
 }   // end of the handleChange event for the showReviews checkbox.
   
 
   refreshRecords(){
     refreshApex(this.results);
 }

} // end of the applicaationCard.js class