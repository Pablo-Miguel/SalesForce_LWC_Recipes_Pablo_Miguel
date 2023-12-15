public with sharing class AccountService {
    @AuraEnabled
    public static Account updateAccountNameById(Id accountId, String newName) {
        System.debug('AccountService.updateAccountNameById');
        System.debug('accountId: ' + accountId);
        System.debug('newName: ' + newName);

        List<Account> accounts = AccountSelector.selectAccountsByIds(new Set<Id>{ accountId });

        if (accounts.isEmpty()) {
            return null;
        }

        accounts[0].Name = newName;
        update accounts;
        return accounts[0];
    }
}