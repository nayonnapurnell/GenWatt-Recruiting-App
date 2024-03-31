   // use the wire service
// this component is used on the Account record page to display a list of related opp records
// need the account ID to pass to the wire adapter function
// need to use the wire service to invoke the getRelatedListRecords function
// need to determine if any records were returned
import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class OppList extends LightningElement {
  // public property to inherit the account ID 
    @api recordId;

    records; //property to hold the related records to display in the UI.
    allRecords; // property to hold ALL related records returned from the wire service.
    results; //property to hold the object that is provisioned from the wire service
    oppsToDisplay = false; //property to determine if we have opp records returned
    status; // property to hold the value displayed in the combobox
    totalRecords;
    totalAmount;



    comboOptions = [
        {label: 'All', value: 'All'},
        {label: 'Open', value: 'Open'},
        {label: 'Closed', value: 'Closed'},
        {label: 'Closed Won', value: 'ClosedWon'},
        {label: 'Closed Lost', value: 'ClosedLost'}
    ];

// use the wire service to invoke the wire adapter function
@wire(getRelatedListRecords, { parentRecordId: '$recordId', relatedListId: 'Opportunities',
fields: ['Opportunity.Id', 'Opportunity.Name', 'Opportunity.StageName', 
'Opportunity.CloseDate', 'Opportunity.Amount',  'Opportunity.IsWon', 'Opportunity.IsClosed']})


relatedOpps(oppRecords){
console.log(oppRecords);
this.results = oppRecords;

if(this.results.data){
    this.records = this.results.data.records;
    this.allRecords = this.results.data.records;
    this.dispatchEvent(new CustomEvent('oppcount', {detail: this.allRecords.length}));

    //The commented out logic is the equivalent to the if/else statement below
    //this.oppsToDisplay = this.records.length > 0 ? true:false;
    if(this.records.length >0){
        this.oppsToDisplay = true;
    }else{
        this.oppsToDisplay = false;
    }
}

if(this.results.error){
    console.error('Error retrieving opportunities...');
    this.oppsToDisplay = false;
}
};

// create a method to handle the selection in the combobox
handleChange(event){
this.status = event.detail.value; // take the value selected from the combobox
this.updateList(); // invoke a method to update the list of records displaying in the UI
}

// create a methd to update the list of records to display in the UI based on the value of status
updateList() {
    // clear out the array of records displaying in the UI
    this.records = [];
    let currentRecord = {};

    // determine which records meet the filter crieteria, and move them into records
    if (this.status === 'All') {
        this.records = this.allRecords;         // move the full array of allRecords into records
    } else {

        for (let i = 0; i < this.allRecords.length; i++) {
            // move the current record into currentRecord
            currentRecord = this.allRecords[i];

            // check the records against the status
            if (this.status === 'Open') {
                if(!currentRecord.fields.IsClosed.value){
                    this.records.push(currentRecord);
                }
            } else if (this.status === 'Closed') {
                if(currentRecord.fields.IsClosed.value){
                    this.records.push(currentRecord);
                }
            } else if (this.status === 'ClosedWon') {
                if(currentRecord.fields.IsWon.value){
                    this.records.push(currentRecord);
                }
            } else if (this.status === 'ClosedLost') {
                if(currentRecord.fields.IsClosed.value && !currentRecord.fields.IsWon.value){
                    this.records.push(currentRecord);
                }
            }
        }
        
    }

    // calculate total record count and amount
    this.totalRecords = this.records.length;
    this.totalAmount = this.records.reduce((prev, curr)=> prev + curr.fields.Amount.value, 0);

    // determine if I have records to display
    this.oppsToDisplay = this.records.length > 0 ? true : false;
}


    


}// end of oppList.js