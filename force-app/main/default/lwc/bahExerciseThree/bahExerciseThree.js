import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import relatedOpps from '@salesforce/apex/OpportunityController.relatedOpps';


export default class BahExerciseThree extends LightningElement {

    //three private boolean properties
    showOne = false;
    showTwo = false;
    loadingAccounts = false;
    loadingOpportunities = false;
    displayOppMessage = false;
    //create the private arrary property named accounts

    accounts = [];
    //     {Id: '111' , Name: 'Tabitha', AnnualRevenue: '2,000,000'},
    //     {Id: '112' , Name: 'Marvin', AnnualRevenue: '1,000,000'},
    //     {Id: '113' , Name: 'Chuck', AnnualRevenue: '5000,000'}
    // ];

    opps = [];
    //     {Id: '111' , Name: 'Trina', Amount: '10,000,000'},
    //     {Id: '222' , Name: 'Francois', Amount: '5,000,000'},
    //     {Id: '333' , Name: 'Corren', Amount: '3,000,000'}
    // ];

    //create a method to toggle showOne
    toggleSectionOne(){

        if(this.showOne){
            this.showOne = false;
        }
        else{
            this.loadingAccounts = true;

            //invoke my getAccounts Apex method
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

    //create a method to toggle showTwo
    toggleSectionTwo(){
        if(this.showTwo){
            this.showTwo = false;
        }else{
            if(this.accounts[0]){
            this.loadingOpportunities = true;

            //invoke relatedOpps Apex method
            relatedOpps( { accountId: this.accounts[0].Id} )
            .then((data) => {
                console.log(data);
                this.opps = data;
                this.showTwo = true;
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(()=> {
                console.log('Finally got opportunities...');
                this.loadingOpportunities = false;
            });

        }else{
            this.displayOppMessage = true;
        }
    }
}

}//End of the bahExerciseThree.js file