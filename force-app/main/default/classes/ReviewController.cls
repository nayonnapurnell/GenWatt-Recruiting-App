public with sharing class ReviewController {

    @AuraEnabled(cacheable=true)
    public static List<Review__c> getReviews(Id applicationId) {
        List<Review__c> reviewList = [SELECT Id, Name, Application__c, Business_Skills__c, Comments__c, Cultural_Fit__c, Interviewer__c, Recommend_for_Hire__c, Technical_Skills__c FROM Review__c where Application__c=:applicationId WITH SECURITY_ENFORCED];
        System.debug('Review LIst ' + reviewList);
        return reviewList;
    } 
} 