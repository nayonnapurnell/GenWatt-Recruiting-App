import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class DataTableTest extends LightningElement {
    accounts = [];

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
    });


