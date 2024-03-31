2/15/2024

As a finance team user when I am creating a payment plan I need to see the total amount of the opportunity for which the invoices are being created for and a running total of the invoices inputted so that I can reconcile the total payments with the expected total from the opportunity.

As a finance team user I should be unable to save a payment plan that does not match the total amount of the opportunity so that I do not inadvertnently under or over bill a client.
 
 - How do I make the save button inactive?
- How do I determine that the payments are under or over? (boolean?)
- How can I dynamically change the state of the save button (rerender)

As a finance team user I need to see any existing invoices already created for an opportunity so that I can include them in an updated payment plan.

How to distinguish between NEW invoices and existing invoices
What do we do if an existing invoice is set back to $0

*********************************************

As a finance team user I should not be able to delete an invoice that has already been paid so that the company maintains an accurate record of payments received. 
DML --> no delete.
VF -> No change (no editing on paid rows)
 
As a finance team user, when I am creating a payment plan I should see all invoices for that opportunity and I should not be able to modify any invoices that have already been paid so that I can correctly reconcile total payments with the expected total from the opportunity.
 
As a finance team user I want to be able to instruct the payment plan calculator to create a plan of 12 equal monthly payments based on the total amount of the opportunity (or remaining Balance) so that the time to create the plan is reduced.
 
As a finance team user I want to be able to instruct the payment plan calculate to create a plan of 4 equal quarterly payments based on the total amount of the opportunity (or remaining Balance) so that the time to create the plan is reduced.



*********************************************
As a developer, I need to be able to generate test data for unit tests so that I can build robust tests.

NOTE: for our purposes - create a solution that will create test data such as:
One or more positions based on status
One or more applications for a position (including an attached contact)
One or more reviews for an applicant (including an attached interviewer)
THIS ONE WILL BE HARD IN THE DEVELOPER ORGS SO JUST ALLOW FOR TWO USERS 


As a recruiter, when I attach an interviewer to a specific position, I need review records to be generated for each applicant in the interviewing status so that the designated interviewer can see who they need to meet with. 


As a recruiter, when I advance an applicant to the 'Interviewing' stage, I need review records to be generated for each interviewer who needs to meet with that applicant.