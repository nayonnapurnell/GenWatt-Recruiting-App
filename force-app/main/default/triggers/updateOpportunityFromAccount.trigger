trigger updateOpportunityFromAccount on Account (after update) {
    //Part One - Gather Ingredients

    //Part Two - Do the work

    //If the change on the Account was a change to the name then we should initiate an update to the Opportunity
    //trigger.new will tell us which accounts have been changed
    //trigger.oldMap will help us compare the value of the account name before and after
    Set<Id> accId = new Set<Id>();
    //For each item in the list I want to look at the value of the field within that record
    for(Account a : trigger.new){
        //If the old name doesn't equal the previous name, add the Id to the Set.
        if(a.Name != trigger.oldMap.get(a.Id).Name){
            accId.add(a.Id);
        }
        
    }

    //Part Three - Submit work to database
    List<Opportunity> oppsToUpdate = [Select Id From Opportunity Where AccountId IN : accId];
    List<Database.SaveResult> srList = Database.update(oppsToUpdate,false);
    for(Database.SaveResult sr : srList){
        System.Debug('Success?: ' + sr.isSuccess());
    }

}