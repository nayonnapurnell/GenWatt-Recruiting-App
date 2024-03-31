import { LightningElement, api, wire } from 'lwc';
import getPositions from '@salesforce/apex/PositionController.getPositions';
import RecordModal from 'c/recordModal'; // import my custom recordModal component
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import PositionMC from '@salesforce/messageChannel/PositionMessageChannel__c';
import { publish, MessageContext } from 'lightning/messageService';



export default class PositionList extends LightningElement {

@api idx;
@api recordId;
positionId;
positionName;
positionStatus;

positions = [];
totalRecords;
records;
allRecords;
openRecords = {};
results; //property to hold the object that is provisioned from the wire service
positionsToDisplay = false; //property to determine if we have accts records returned
selectedStatus = 'All'; // property to hold the value displayed in the combobox


comboOptions = [
    {label: 'All', value: 'All'},
    {label: 'New', value: 'New'},
    {label: 'Open', value: 'Open'},
    {label: 'Closed', value: 'Closed'}
];

@wire(MessageContext)
msgContext;


    @wire(getPositions)
    getPositions(positionRecords){

        this.results = positionRecords;

        if(this.results.data){
            this.positions = this.results.data;
            this.records = this.results.data.records;
            this.allRecords = this.results.data.records;
            this.positionsToDisplay = true;
            this.positionId = this.positions[0].Id;
            this.positionName = this.positions[0].Name;
            this.positionStatus = this.positions[0].Status__c;
        }
        if(this.results.error){
            console.error('Error retrieving Positions...');
            this.positionsToDisplay = false;
        }
      this.updateList();
    } // end of the getPositions wire method.


    // createPositions method to create the New Position from the Position List
    createPosition(){
         // open the modal window 
    RecordModal.open({
        size: 'medium',
        recordId: this.recordId,
        objectApiName: 'Position__c',
        formMode: 'create',
        layoutType: 'Compact',
        headerLabel: 'Create Position'
   })
   .then((result)=> {
    // check to see how the modal window was closed
    if (result){
         // check to see if the result is a success, and is so, dispatch a toast event notification
         if (result.type === 'success'){

              const myToastEvent = new ShowToastEvent({
                   title: 'Position Saved Successfully',
                   message: 'This position ' + result.detail.positionName + ' was saved successfully!',
                   variant: 'success',
                   mode: 'dismissible'
              });
              this.refreshRecords();

              // dispatch the toast notification
              this.dispatchEvent(myToastEvent);
         }
    }
})
    .catch((err) => {
        console.error(err);
    })
    .finally(()=> {
        console.log('Finally got positions...');
    });
    }

    sendMessageService(){
        publish(this.msgContext, PositionMC, {recordId: this.positionId, positionName: this.positionName});
    }


     // create a method to handle the selected event raised by the positionCard
     handleSelection(event){
        console.log('Event ' + event);
        this.positionId = event.detail.positionId;
        this.positionName = event.detail.positionName;

        this.sendMessageService();
    }
      



    // create a method to handle the selection in the combobox
handleChange(event){
    this.selectedStatus = event.detail.value; // take the value selected from the combobox
    this.updateList(); // invoke a method to update the list of records displaying in the UI
    }

    refreshRecords(){
        refreshApex(this.results);
    }

    // create a method to update the list of records to display in the UI based on the value of status
updateList() {
    // clear out the array of records displaying in the UI
    this.records = [];
    let currentRecord = {};


    if (this.selectedStatus === 'All') {
        this.records = this.positions;         // move the full array of allRecords into records
    } else{

        for(let i = 0; i < this.positions.length; i++){
            // move the current record into currentRecord
            currentRecord = this.positions[i];

            if(this.selectedStatus === 'Open'){
                    if(this.positions[i].Status__c === 'Open'){                
                        this.records.push(currentRecord);
                    }          
            }  else if(this.selectedStatus === 'New'){
                if(this.positions[i].Status__c === 'New'){                
                    this.records.push(currentRecord);
                }          
            }  else{
                if(this.positions[i].Status__c === 'Closed'){                
                    this.records.push(currentRecord);
                }          
            }            
        }
    }
  

     // calculate total record count and amount
     this.totalRecords = this.records.length;
     
    //this.positionsToDisplay = this.records.length > 0 ? true : false;
    if(this.records.length > 0){
        this.positionsToDisplay = true;
        this.positionId = this.records[0].Id;
        this.positionName = this.records[0].Name;
        this.sendMessageService();
    }
} // end of the updateList method.

} // end of the positionList.js