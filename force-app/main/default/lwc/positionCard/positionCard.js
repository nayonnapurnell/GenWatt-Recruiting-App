import { LightningElement, api } from 'lwc';

export default class PositionCard extends LightningElement {

    @api positionId;
    @api positionName;
    @api dueDate;
    @api positionStatus;
    @api positionSalary;
    
    @api idx;


// method that numbers the positions starting at 1.
    get ranking(){
        return this.idx + 1;
    }

//method that stores the custom event
positionSelected(){

const positionSelected = new CustomEvent('selected', {detail: {positionId: this.positionId, positionName: this.positionName, idx: this.idx}});
    
    console.log('Test Postion Id' + this.positionId);

    console.log('The current position Id and position name is: ' + this.positionId + ' ' + this.positionName + this.idx);
    
    // dispatch my custom event
    this.dispatchEvent(positionSelected);
    
    }// end of the positiontSelected custom event




} // end of the positionCard.js class