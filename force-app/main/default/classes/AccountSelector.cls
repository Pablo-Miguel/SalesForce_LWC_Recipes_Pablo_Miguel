public with sharing class AccountSelector {
    
    public static List<Account> selectAccountsByIds(Set<Id> accountIds) {
        return [SELECT Id, Name FROM Account WHERE Id IN :accountIds];
    }

}