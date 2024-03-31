public class PositionController {

    @AuraEnabled(cacheable=true)
    public static List<Position__c> getPositions(){
        List<Position__c> positionList = [SELECT Id, Name, Due_Date__c, Status__c, Salary__c FROM Position__c WITH SECURITY_ENFORCED];
        
        return positionList;
    }
  
} // end of the PositionController