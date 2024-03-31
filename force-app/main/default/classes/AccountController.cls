public  class AccountController {
    
    @AuraEnabled
    public static List<Account> getAccounts() {

        List<Account> acctList = [select ID, Name, Phone, AnnualRevenue FROM Account LIMIT 5];

        return acctList;
    }

   
    @AuraEnabled(cacheable=true)
    public static List<Account> getTopAccounts(){
        List<Account> acctList = [SELECT Id,Name, Phone, AnnualRevenue FROM Account WITH SECURITY_ENFORCED ORDER BY AnnualRevenue DESC NULLS LAST LIMIT 5];
       return acctList; 
    }

} 