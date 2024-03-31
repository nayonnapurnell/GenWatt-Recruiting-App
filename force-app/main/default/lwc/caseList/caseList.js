import { LightningElement, api, wire} from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class CaseList extends LightningElement {
// public property to inherit the account ID 
@api recordId;

records; //property to hold the related records returned from the wire service
results; //property to hold the object that is provisioned from the wire service
casesToDisplay = false; //property to determine if we have opp records returned
allRecords = []; // property to hold ALL related records returned from the wire service.
selectedStatus; // property to hold the value displayed in the combobox


comboOptions = [
    {label: 'All', value: 'All'},
    {label: 'New', value: 'New'},
    {label: 'Working', value: 'Working'},
    {label: 'Escalated', value: 'Escalated'},
    {label: 'Closed', value: 'Closed'}
];



// use the wire service to invoke the wire adapter function
@wire(getRelatedListRecords, { parentRecordId: '$recordId', relatedListId: 'Cases',
fields: ['Case.Id', 'Case.Subject', 'Case.Status', 
'Case.Priority', 'Case.CaseNumber']})

relatedCases(caseRecords){
    console.log(caseRecords);
    this.results = caseRecords;
    
    if(this.results.data){
        this.records = this.results.data.records;
        this.casesToDisplay = this.records.length > 0 ? true:false;
        this.allRecords = this.results.data.records;
        this.dispatchEvent(new CustomEvent('casecount', {detail: this.allRecords.length}));

    }
    
    if(this.results.error){
        console.error('Error retrieving opportunities...');
        this.casesToDisplay = false;
    }
    };

    // create a method to handle the selection in the combobox
handleChange(event){
    this.selectedStatus = event.detail.value; // take the value selected from the combobox
    this.updateList(); // invoke a method to update the list of records displaying in the UI
}

// create a methd to update the list of records to display in the UI based on the value of status
updateList() {
    this.records = [];

    if (this.selectedStatus === 'All') {
        this.records = this.allRecords;
    } else {
        this.records = this.allRecords.filter(elem => elem.fields.Status.value === this.selectedStatus);
    }

    this.casesToDisplay = this.records.length > 0 ? true : false;
}

}
