trigger applyNamingConvention on Opportunity (before insert, before update) {

    //trigger.new will be a List<Opportunity> that need to be processed
    //The naming convention is Account Name - Opportunity Type - ClosedMonth/ClosedYear

    //Part One - Gather Ingredients
    //Retrieve any Account Names that we need

    Map<Id, Account> parentAccounts = new Map<Id,Account>();
    Set<Id> parentIds = new Set<Id>();
    for(Opportunity o : trigger.new){
        parentIds.add(o.AccountId);
    }
    for(Account a : [Select Id, Name From Account Where Id In :parentIds]){
        parentAccounts.put(a.Id,a);
    }

    //Part Two - Do the work
    //Update all the opportunities so that the name field matches the convention
    for(Opportunity o : trigger.new){
        o.Name = parentAccounts.get(o.AccountId).Name + ' - ' + o.Type + ' - ' +
        String.valueOf(o.CloseDate.month()) + '/' + String.valueOf(o.CloseDate.year());
    }

    //Part Three - Submit work (if needed)
    //Update opportunities ***Not Necessary because it is a before trigger


}