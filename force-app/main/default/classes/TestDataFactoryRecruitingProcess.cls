@isTest

public class TestDataFactoryRecruitingProcess {
    
    /*
    As a developer, I need to be able to generate test data for unit tests so that I can build robust tests.

    NOTE: for our purposes - create a solution that will create test data such as:
    One or more positions based on status
    One or more applications for a position (including an attached contact)
    One or more reviews for an applicant (including an attached interviewer)
    THIS ONE WILL BE HARD IN THE DEVELOPER ORGS SO JUST ALLOW FOR TWO USERS 
    */
    
    
//Position
//Application - Application__c
//Applicants linked to the Position
//Contact - linked to the Applicant 
//Interviewer - Interviewer__c


//Need a test method for the bottom two stories




public static void createSimpleScenario(String type){
    if(type == 'Single'){
       List<Position__c> newPos =  createPositions('Interviewing', 1);
       insert newPos;
    
       List<Application__c> newApps = createApplication(1, newPos);
       insert newApps;
    }
    else if(type =='Bulk'){
        List<Position__c> newPos =  createPositions('Open', 201);
       insert newPos;
    
       List<Application__c> newApps = createApplication(1, newPos);
       insert newApps;
    }
    }

public static List<Position__c> createPositions(String status, Integer createNum){
    //Retrieving user record Id to use for hiring manager on the Position
    User hMan = [Select ID From User Where Profile.Name = 'System Administrator' Limit 1];

    List<Position__c> newPositions = new List<Position__c>();
    for(Integer i = 0; i < createNum; i++){
        Position__c newPosition = new Position__c();
        newPosition.Name = 'Test Position #' + String.valueOf(i);
        newPosition.Hiring_Manager__c = hMan.Id;
        newPosition.Description__c = 'Description of position';
        newPosition.Due_Date__c = Date.Today()+90;
        newPosition.Status__c = status;
        newPositions.add(newPosition);
    }
    return newPositions;
}//End of the createPositions method

public static List<Application__c> createApplication(Integer createNum, List<Position__c> positions){
    //Assumes that positions have already been inserted
    //Create

    Account umbrellaAccount = new Account(Name = 'Umbrella Account');
    insert umbrellaAccount;

    //Need to get correct RecordType Id for Candidates
    RecordType canRT = [Select Id From RecordType Where Name = 'Candidate' Limit 1];

    //Create contacts(candidates) linked to umbrella account and use Candidate recordtype
    List<Contact> newCan = new List<Contact>();
    for(Integer i = 0; i < createNum; i++){
        Contact newContact =new Contact(); 
        newContact.FirstName = 'Test Contact';
        newContact.LastName = 'Candidate #' + String.valueOf(i);
        newContact.AccountId = umbrellaAccount.Id;
        newContact.RecordTypeId = canRT.Id;
        newCan.add(newContact);
    }
    insert newCan;

    List<Application__c> newApps = new List<Application__c>();
    for(Position__c p: positions){

        for(Contact c : newCan){
            Application__c newApp = new Application__c();
            newApp.Name = 'New App';
            newApp.Candidate__c = c.Id;
            newApp.Position__c = p.Id;
            newApp.Status__c = 'Applied';
            newApps.add(newApp);
        } 
        
    }
    return newApps;
   
}

public static Interviewer__c createInterviewer(Id positionId, Id userId){
    Interviewer__c newInt = new Interviewer__c();
    newInt.Name = 'New Test Interviewer';
    newInt.Position__c = positionId;
    return newInt;
}




    
}//End of the test class