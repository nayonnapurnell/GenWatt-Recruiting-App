public with sharing class interviewerHandlerTest {
    public static void testNewInterviewerInsert_Positive() {

        TestDataFactoryRecruitingProcess.createSimpleScenario('Single');
        Application__c currentApp = [Select Id, Position__c, Status__c From Application__c Limit 1];
        currentApp.Status__c = 'Interviewing';
        update currentApp;

        User newIntUser = [Select ID From User Where Profile.Name = 'Standard Platform User' Limit 1];

        Test.startTest();
        Interviewer__c newInt = TestDataFactoryRecruitingProcess.createInterviewer(currentApp.Position__c, newIntUser.Id);
        insert newInt;
        Test.stopTest();

        //Check to see that a review record has been created for the application
        List<Review__c> newRev = [Select Id, Application__c, Interviewer__c From Review__c];
        System.assertEquals(1, newRev.size(), 'Incorrect number of review records created');
            for(Review__c r: newRev){
                System.assertEquals(currentApp.Id, r.Application__c, 'Review records created but not linked to Application');
            }
        }

    }//End of method

    public static void testNewInterviewerInsertBulk_Positive() {
        TestDataFactoryRecruitingProcess.createSimpleScenario('Open');
        Application__c currentApp = [Select Id, Position__c, Status__c From Application__c Limit 1];
        currentApp.Status__c = 'Interviewing';
        

        User newIntUser = [Select ID From User Where Profile.Name = 'Standard Platform User' Limit 1];

        Test.startTest();
        Interviewer__c newInt = TestDataFactoryRecruitingProcess.createInterviewer(currentApp.Position__c, newIntUser.Id);
        insert newInt;
        Test.stopTest();

        //Check to see that a review record has been created for the application
        List<Review__c> newRev = [Select Id, Application__c, Interviewer__c From Review__c];
        System.assertEquals(1, newRev.size(), 'Incorrect number of review records created');
            for(Review__c r: newRev){
                System.assertEquals(currentApp.Id, r.Application__c, 'Review records created but not linked to Application');
            }
        }

    }//End of method



    private static void testNewInterviewerInsert_Negative(){

        TestDataFactoryRecruitingProcess.createSimpleScenario('Single');
        Application__c currentApp = [Select Id, Position__c, Status__c From Application__c Limit 1];
        currentApp.Status__c = 'Interviewing';
        update currentApp;

        User newIntUser = [Select ID From User Where Profile.Name = 'Standard Platform User' Limit 1];

        Test.startTest();
        Interviewer__c newInt = TestDataFactoryRecruitingProcess.createInterviewer(currentApp.Position__c, newIntUser.Id);
        insert newInt;
        Test.stopTest();

        //Check to see that a review record has been created for the application
        List<Review__c> newRev = [Select Id, Application__c, Interviewer__c From Review__c];
        System.assertEquals(0, newRev.size(), 'Incorrect number of review records created');      
    }
    }
}