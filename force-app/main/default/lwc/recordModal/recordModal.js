import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class RecordModal extends LightningModal {

    // public properties to hold values for displaying/editing/creating a record
    @api recordId;
    @api objectApiName;
    @api formMode;
    @api layoutType;
    @api headerLabel;

    handleCancel(){
        this.close('modcancel');
    }

    handleSuccess(event){
        this.close(event);
    }













}// end of the recordModal.js file