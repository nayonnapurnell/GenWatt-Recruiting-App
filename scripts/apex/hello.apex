// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents
List<Position__c> positionList = [SELECT Id, Name, Due_Date__c, Status__c, Salary__c FROM Position__c];
System.debug('List of Positions' + positionList);
        
