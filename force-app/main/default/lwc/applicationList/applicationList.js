import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class ApplicationList extends LightningElement {

@api idx;
@api recordId;
@api applicationName;


applications = [];
records;
results;
applicationsToDisplay = false; 
selectedStatus; // property to hold the value displayed in the combobox

comboOptions = [
    {label: 'Applied', value: 'Applied'},
    {label: 'Interviewing', value: 'Interviewing'},
    {label: 'Rejected', value: 'Rejected'},
    {label: 'Withdrawn', value: 'Withdrawn'},
    {label: 'Offered', value: 'Offered'},
    {label: 'Accepted', value: 'Accepted'}
];

// use the wire service to invoke the wire adapter function
@wire(getRelatedListRecords, { parentRecordId: '$recordId', relatedListId: 'Applications__r',
fields: ['Application__c.Id', 'Application__c.Name', 'Application__c.Status__c', 'Application__c.Position__c', 
'Application__c.Num_of_Reviews__c', 'Application__c.Candidate__c', 'Application__c.Review_Score__c', 'Application__c.Candidate__r.Name']})
relatedApplications(applicationRecords){
    console.log('Related Application records ' + applicationRecords);
    this.results = applicationRecords;

    console.log('Application result  ' + this.results);
    console.log('Application data  ' + this.results.data);
    

    if(this.results.data){
        console.log(this.results.data.records);
        this.records = this.results.data.records;
        this.applicationsToDisplay = this.records.length > 0 ? true:false;
        this.applications = this.results.data.records;
        this.dispatchEvent(new CustomEvent('applicationcount', {detail: this.applications.length}));
        
    }

    if(this.results.error){
        console.error('Error retrieving applications...');
        this.applicationsToDisplay= false;
    }
    }; // end of the related applications method.


    // create a method to handle the selection in the combobox
    handleChange(event){
        console.log('Event ' + event);
        this.selectedStatus = event.detail.value; // take the value selected from the combobox
        this.updateList(); // invoke a method to update the list of records displaying in the UI
    }

    // create a methd to update the list of records to display in the UI based on the value of status
updateList() {
    this.records = [];

    if (this.selectedStatus === 'All') {
        this.records = this.applications;
    } else {
        this.records = this.applications.filter(elem => elem.fields.Status__c.value === this.selectedStatus);
    }

    this.applicationsToDisplay = this.records.length > 0 ? true : false;
}



} // end of the applicationList.js file.