import { LightningElement, api, wire } from 'lwc';
import relatedOpps from '@salesforce/apex/OpportunityController.relatedOpps';
import { refreshApex } from '@salesforce/apex';

export default class RelatedOppsComponent extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api mode = 'readonly';
    @api layoutType = 'Full';
    Id;
    Name;

    selectedId;
    selectedName;

    showForm = false;
 
    opps = [];
    results;

    @wire(relatedOpps, { accountId: '$recordId'} )
    wiredOpps(oppRecs){
        this.results = oppRecs;

        if(this.results.data){
            this.opps = this.results.data;
        }
        if(this.results.error){
            console.error(error);
        }
    }

    // create method to handle oppselected event
    handleOppEvent(event) {

        if (event.detail.oppid != this.selectedId) {
            this.selectedId = event.detail.oppid;
            this.selectedName = event.detail.oppname;
            this.showForm = true;
        } else {
            this.showForm = false;
        }
        
    }


 connectedCallback() {

            // //invoke relatedOpps Apex method
            // relatedOpps( { accountId: this.recordId} )
            // .then((data) => {
            //     console.log(data);
            //     this.opps = data;
            // })
            // .catch((err) => {
            //     console.error(err);
            // })
            // .finally(()=> {
            //     console.log('Finally got opportunities...');
            // });
    }


    //method to retrieve related Opps
    // method to retrieve opp records
    getRelatedOpps() {
        relatedOpps({ accountId: this.recordId })
            .then((data) => {
                this.opps = data;
            })
            .catch((error) => {
                console.error(error);
                this.opps = undefined;
            })
            .finally(() => {
                console.log('Finally returned opp records....');
            });
    }

    handleOppEvent(event){
        this.Id = event.detail.oppId;
        this.Name = event.detail.oppName;
    }


refreshRecords(){
    refreshApex(this.results);
}



} // End of the relatedOppsComponent

