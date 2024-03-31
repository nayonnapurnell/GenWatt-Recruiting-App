import { LightningElement, api } from 'lwc';
import GenWattStyle from '@salesforce/resourceUrl/GenWattStyle';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class HelloWorld extends LightningElement {

    // "special" public properties
    @api recordId;
    @api objectApiName;

    // declare a property
    @api firstName = 'World';

    // use the constructor to invoke the loadStyle method to load my static resource (ESS);
    constructor(){
        super();

        // invoke the  loadStyle method
        loadStyle(this, GenWattStyle)
            .then(() => {console.log('Style sheet loaded...')})
            .catch((error)=> {console.error(error)})
            .finally(() => {console.log('Finally finished with the loadStyle promise....')});
    }
}
