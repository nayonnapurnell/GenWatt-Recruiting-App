trigger OpportunityMasterTrigger on Opportunity (before insert, after insert, 
                                         before update, after update, 
                                         before delete, after delete, 
                                         after undelete) {

//Setting up a Trigger that fires everytime there is a DML Operation ^^^^^^^ Example: before insert, after update, etc...

//The if statements below help the system determine what type of event is firing off if the DML Operation happens

if(trigger.isBefore){
    if(trigger.isInsert){
        OppHandler.applyNamingConvention(trigger.new);
    }
    if(trigger.isUpdate){
        OppHandler.applyNamingConvention(trigger.new);
    }
    if(trigger.isDelete){
        
    }

}
if(trigger.isAfter){
    if(trigger.isInsert){
  

    }
    if(trigger.isUpdate){

    }
    if(trigger.isDelete){
        
    }

}



}//end of the OppMasterTrigger