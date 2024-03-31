public with sharing class OppHandler {

    //Creating the signature for the method.
    //Creating a blank list of Opportunities with a name that is being passed through the method in memory.
    //
    public static void applyNamingConvention(List<Opportunity> triggernew) {

        Map<Id, Account> parentAccounts = new Map<Id,Account>();
        Set<Id> parentIds = new Set<Id>();
        
        for(Opportunity o : triggernew){
            parentIds.add(o.AccountId);
        }
        for(Account a : [Select Id, Name From Account Where Id In :parentIds]){
            parentAccounts.put(a.Id,a);
        }
    
        //Part Two - Do the work
        //Update all the opportunities so that the name field matches the convention
        for(Opportunity o : triggernew){
            o.Name = parentAccounts.get(o.AccountId).Name + ' - ' + o.Type + ' - ' +
            String.valueOf(o.CloseDate.month()) + '/' + String.valueOf(o.CloseDate.year());
        } 
    }//End of the applyNamingConvention method.

    //Create a method to create the invoice
    public static Invoice__c createInvoice(Opportunity opp){
        Invoice__c inv= new Invoice__c();
        inv.Account__c = opp.AccountId;
        inv.Opportunity__c = opp.Id;
        inv.Amount__c = opp.Amount;
        inv.Due_Date__c = opp.CloseDate + 30;
        
        return inv;
    }


    public static void createInvoiceFromOpportunity(List<Opportunity> triggernew, Map<Id, Opportunity> triggeroldmap){

        //Create a list to hold my new invocies to be created
        List<Invoice__c> newInvoices = new List<Invoice__c>();

        //Iterate over the recordsd and check the stage for Closed-Won
        for(Opportunity opp : triggernew){
            //If its an existing Opportunity, check to see if the stage is closed won
            //check to see if the stage changed to Closed Won
            if(opp.isWon && !triggeroldMap.get(opp.Id).isWon){
                newInvoices.add(createInvoice(opp));
            //add the Invoice record to the list of invoices to be created

            }
        }
//Check to see if my list of invoices has any values, and if so, insert them into the database
   if(!newInvoices.isEmpty()){
       Database.insert(newInvoices,false);
   }

}


    //End of the createInvoiceFromOpportunity method.

}//End of the OppHandler class.