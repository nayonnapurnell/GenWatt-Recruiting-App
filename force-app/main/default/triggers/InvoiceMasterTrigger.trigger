trigger InvoiceMasterTrigger on Invoice__c (before insert, after insert, 
                                        before update, after update, 
                                        before delete, after delete, 
                                        after undelete) {
                                            if(trigger.isBefore){
                                                if(trigger.isInsert){
                                                  
                                                }
                                                if(trigger.isUpdate){   
                                                   
                                                }
                                                if(trigger.isDelete){     
                                                }
                                            }
                                            
                                            if(trigger.isAfter){
                                                if(trigger.isInsert){
                                                    InvoiceTriggerHandler.applySharing(trigger.new);
                                                }
                                                if(trigger.isUpdate){  
                                                    InvoiceTriggerHandler.applySharing(trigger.new);
                                                }
                                                if(trigger.isDelete){       
                                                }
                                                if(trigger.isUnDelete){      
                                                }
    
                                            }

}