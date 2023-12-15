public with sharing class UserSelector {
    public static List<User> selectUserById(Set<Id> userIds) {
        return [SELECT Id, Name FROM User WHERE Id IN :userIds];
    }
}