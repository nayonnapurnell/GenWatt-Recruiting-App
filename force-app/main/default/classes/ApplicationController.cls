public class ApplicationController {

        @AuraEnabled(cacheable=true)
        public static List<Application__c> relatedApplications(String positionId) {
            List<Application__c> appList = [SELECT Id, Name, Position__c, Status__c, Candidate__c, Num_of_Reviews__c, Review_Score__c, Sum_of_Reviews__c FROM Application__c WHERE Position__c =:positionId WITH SECURITY_ENFORCED];

            System.debug('Testing the appList SOQL query' + appList);
    
            return appList;
        }
}