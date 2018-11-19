angular.module("nativeIP").factory("contactsAPI", function($http, config){
    var _getContacts = function(){
        return $http.get(config.baseUrl + "/contacts");
    };

    var _getContact = function(id){
        return $http.get(config.baseUrl + "/contacts/"+id);
    };

    var _saveContacts = function(contact){
        return $http.post(config.baseUrl + "/contacts", contact);
    };

    var _updateContact = function(id, contact){
        return $http.put(config.baseUrl + "/contacts/"+id, contact);
    };

    var _deleteContacts = function(id){
        return $http.delete(config.baseUrl + "/contacts/"+id);
    };

    return {
        getContacts: _getContacts,
        getContact: _getContact,
        saveContacts: _saveContacts,
        updateContact: _updateContact,
        deleteContacts: _deleteContacts
    };
});