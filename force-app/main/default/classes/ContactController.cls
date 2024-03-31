public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accountId) {
        List<Contact> conList = [SELECT Id,FirstName, LastName, Title, Email from Contact where AccountId=:accountId WITH SECURITY_ENFORCED];
        return conList;
    } 
} 