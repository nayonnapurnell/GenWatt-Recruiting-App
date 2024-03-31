public with sharing class dxSample {

    //With sharing means we want the code to take into account the Sharing model for that user the same way it would on the front end.
    //You must have an xml with the same name that is listed as an Active Status in order to deploy.

    public dxSample() {
        //The code dxSample() will execute once an instance of this method is executed.
        
        System.debug('This is inside the constructor method');
        System.debug('This was executed Anonymously');

        Account acctTest = new Account();
        acctTest.Name = 'Nayonna Purnell';
        acctTest.Phone = '2676266482';

        insert acctTest;

        Contact contactTest = new Contact();
        contactTest.FirstName = 'Tanya';
        contactTest.LastName = 'James';
        contactTest.AccountId = acctTest.Id;

        insert contactTest;



    }

    //
}