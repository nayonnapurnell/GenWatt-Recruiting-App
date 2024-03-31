import { LightningElement, api } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class PropExercise extends LightningElement {

    @api showDetails = false;
    @api cardTitle = 'PropExercise';

    @api sampleText = 'Lorem Ipsum';

    accounts = [];

    connectedCallback(){
        getAccounts()
        .then((data) => {
            console.log(data);
            this.accounts = data;
            this.showOne = true;
            
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(()=> {
            console.log('Finally got accounts...');
            this.loadingAccounts = false;
        });

    }
   
    
}