import { LightningElement, api } from 'lwc';

export default class FormToggle extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api mode = 'readonly';
    @api layoutType = 'Compact';
    @api displayMode = 'edit';
   


    handleClick(){
      this.mode = 'edit';
    }
    



}// End of the formToggle.js file