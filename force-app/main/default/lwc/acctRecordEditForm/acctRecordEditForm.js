import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';



export default class AcctRecordEditForm extends LightningElement {

    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;

    editMode = false;

    // create properties to hold the schema information from the imported fields so we can bind them to our markup
    nameField = NAME_FIELD;
    industryField = INDUSTRY_FIELD;
    annualRevenueField = ANNUAL_REVENUE_FIELD;
    phoneField = PHONE_FIELD;


    // create a method to toggle between modes
    toggleMode() {
        this.editMode = !this.editMode;
    }

}