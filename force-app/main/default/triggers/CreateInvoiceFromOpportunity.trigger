trigger CreateInvoiceFromOpportunity on Opportunity (after insert, after update) {

/* Invoice__c Object
Name - Use Autonnumber INV-{0000}
Amount - Currency field
Due Date - Date field
Paid - checkbox
Account - lookup Field
Opportunity - lookup field*/



  //Create a list to hold my new invocies to be created
  List<Invoice__c> newInvoices = new List<Invoice__c>();

   for(Opportunity opp : trigger.new){
    if(opp.IsWon){
        Invoice__c inv= new Invoice__c();
        inv.Account__c = opp.AccountId;
        inv.Opportunity__c = opp.Id;
        inv.Amount__c = opp.Amount;
        inv.Due_Date__c = opp.CloseDate + 30;

        //Add the INvoice record to the list of invoices to be created
        newInvoices.add(inv);
    }
   }//Check to see if the new Opp is set to Closed Won

 if(trigger.isUpdate){
    for(Opportunity opp : trigger.new){
        if(opp.isWon && !trigger.oldMap.get(opp.Id).isWon){
            Invoice__c inv = new Invoice__c();
            inv.Account__c = opp.AccountId;
            inv.Opportunity__c = opp.Id;
            inv.Amount__c = opp.Amount;
            inv.Due_Date__c = opp.CloseDate + 30;
        //add the Invoice record to the list of invoices to be created
        newInvoices.add(inv);

        }
    }
//Check to see if my list of invoices has any values, and if so, insert them into the database
    if(!newInvoices.isEmpty()){
        Database.insert(newInvoices,false);
    }

 }
 

}//End of Trigger