@isTest
private class InvoicesControllerTest {
   
    @isTest
    static void testSave(){
        
        //Gather Ingredients
        //need an invoice

      //need a linked account
        Account testAccount = new Account();
        testAccount.Name = 'Test';
        insert testAccount;

        List<Opportunity> testOpp = new List<Opportunity>();
        //need a linked opportunity
        Opportunity o = new Opportunity();
            o.AccountId = testAccount.Id;
            o.Name = 'Test';
            o.Type = 'New Customer';
            o.Amount = 120000;
            o.StageName = 'Closed Lost';
            o.CloseDate = Date.today();
        insert o;
        testOpp.add(o);

       //need an instance of the class
       ApexPages.StandardSetController testSSC = new ApexPages.StandardSetController(new List<Opportunity>{o});
       
    Invoice__c testInvoice = new Invoice__c();
        testInvoice.Opportunity__c = o.Id;
        testInvoice.Account__c = o.Id;
        testInvoice.Amount__c = o.Amount;
        testInvoice.Due_Date__c = o.CloseDate + 90;

    InvoicesController invExt = new InvoicesController(testSSC);
    invExt.newinvoices.add(testInvoice);
    PageReference testPage = new PageReference(','+o.Id);


        Test.startTest();
        //Do something that needs testing
        PageReference testPR = invExt.save();

        Test.stopTest();

        //Checks to see everything worked
        System.assertEquals('/'+o.Id, testPR.getURL(), 'Incorrect return URL');
        List<Invoice__c> savedInvoices = [SELECT Id FROM Invoice__c];
        System.assertEquals(1, savedInvoices.size(), 'Incorrect number of invoices created');

    }
   
}