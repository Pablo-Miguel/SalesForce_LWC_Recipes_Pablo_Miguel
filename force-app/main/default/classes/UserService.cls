public with sharing class UserService {
    
    @AuraEnabled(cacheable=true)
    public static User getCurrentUser(Id userId) {
        List<User> users = UserSelector.selectUserById(new Set<Id>{ userId });

        if(users.isEmpty()) {
            return null;
        }
        return users[0];
    }

}