import { LightningElement } from 'lwc';
import GenWattStyle from '@salesforce/resourceUrl/GenWattStyle';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class BahExerciseOne extends LightningElement {
    // declare a the firstName, lastName, and jobTitle property
    firstName = 'First Name';

    lastName = 'Last Name';

    jobTitle = 'Job Title';

      // use the constructor to invoke the loadStyle method to load my static resource (ESS);
      constructor(){
        super();

        // invoke the  loadStyle method
        loadStyle(this, GenWattStyle)
            .then(() => {console.log('Styling now!')})
            .catch(() => {console.error('No styles loaded.')})
            .finally(() => {console.log('Finally finished with the loadStyle promise....')});
    }
}