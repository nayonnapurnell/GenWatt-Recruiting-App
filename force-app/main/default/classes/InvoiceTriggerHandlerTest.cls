@isTest

private class InvoiceTriggerHandlerTest {
    
    @isTest
    private static void applySharingTest(){
        //Ingredients needed for Sharing Test
        //Opportunity - with an Owner (opp gets set to Close Won)

        testdatafactory.createSingleAccWithOpp();
        Opportunity opp = [Select Id, OwnerId From Opportunity Limit 1];
        //Invoice__c linked to that Opportunity

        //Test is the inset or update of invoice record
        Test.startTest();
        opp.StageName = 'Closed Won';
        update opp;
        Test.stopTest();

        //Check with a query to Invoice__Share to check results
        for(Invoice__Share is :[Select Id, ParentId, UserOrGroupId,RowCause, AccessLevel From Invoice__Share]){
            
        }    
    }
}