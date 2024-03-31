public class OpportunityController {
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> relatedOpps(String accountId) {
        List<Opportunity> oppList = [SELECT Id, Name, AccountId, Amount, CloseDate, StageName FROM Opportunity WHERE AccountId =:accountId WITH SECURITY_ENFORCED];

        return oppList;

    }
}