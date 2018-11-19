angular.module("nativeIP").controller("contactsController", function ($scope, contact, contacts, contactsAPI, $location) {

    if(contact){
        $scope.contact = contact.data;
    }

    if(contacts){
        $scope.contacts = contacts.data;

        $scope.deleteContacts = function (contacts){
            contacts.filter(function (contact){
                if (contact.selected){
                    contactsAPI.deleteContacts(contact.id).then(function (response){
                        loadContacts();
                    }, function (error) {
                        $scope.returnStatus = error.status;
                    });
                };
            });
        };

        var loadContacts = function () {
            contactsAPI.getContacts().then(function (response) {
                $scope.contacts = response.data;
                $scope.checkContactSelected();
            }, function (error){
                console.log(error);
            });
        };
    
        $scope.checkContactSelected = function () {
            $scope.hasContactSelected = $scope.contacts.some(function (contact) {
                return contact.selected;
            });
        };
    
        $scope.orderBy = function (field) {
            $scope.orderField = field;
            $scope.direction = !$scope.direction;
        };
    }

    $scope.addContact = function (contact) {
        contactsAPI.saveContacts(contact).then(function (response){
            delete $scope.contact;
            $scope.contactForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/contacts");
        });
    };

    $scope.editContact = function (contact) {
        contactsAPI.updateContact(contact.id, contact).then(function (response){
            delete $scope.contact;
            $scope.contactForm.$setPristine();
        }, function (error){
            console.log(error);
        }).then(function (response) {
            $location.path("/contacts");
        });
    };
});