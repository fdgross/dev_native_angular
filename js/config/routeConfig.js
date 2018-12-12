angular.module("nativeIP").config(function ($routeProvider){
    /**
     * ROUTER FOR FEATURES
     */
    $routeProvider.when("/features", {
        templateUrl: "view/features.html",
        controller: "featuresController",
        resolve: {
            features: function (featuresAPI) {
                return featuresAPI.getFeatures();
            }
        }
    });
    /**
     * END ROUTER FOR FEATURES
     */

    /**
     * ROUTER FOR PEERS
     */
    $routeProvider.when("/peers", {
        templateUrl: "view/peers.html",
        controller: "peersController",
        resolve: {
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            peer: function () {
                return "";
            },
            categories: function (categoriesAPI) {
                return categoriesAPI.getCategories();
            },
            groups: function (groupsAPI) {
                return groupsAPI.getGroups();
            },
            profiles: function (profilesAPI) {
                return profilesAPI.getProfiles();
            },
            costCenters: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newPeer/:id", {
        templateUrl: "view/newPeer.html",
        controller: "peersController",
        resolve: {
            peers: function () {
                return "";
            },
            peer: function (peersAPI, $route) {
                return peersAPI.getPeer($route.current.params.id);
            },
            categories: function (categoriesAPI) {
                return categoriesAPI.getCategories();
            },
            groups: function (groupsAPI) {
                return groupsAPI.getGroups();
            },
            profiles: function (profilesAPI) {
                return profilesAPI.getProfiles();
            },
            costCenters: function (costCentersAPI) {
                return costCentersAPI.getCostCenters();
            }
        }
    });

    $routeProvider.when("/newPeer", {
        templateUrl: "view/newPeer.html",
        controller: "peersController",
        resolve: {
            peers: function () {
                return "";
            },
            peer: function () {
                return "";
            },
            categories: function (categoriesAPI) {
                return categoriesAPI.getCategories();
            },
            groups: function (groupsAPI) {
                return groupsAPI.getGroups();
            },
            profiles: function (profilesAPI) {
                return profilesAPI.getProfiles();
            },
            costCenters: function (costCentersAPI) {
                return costCentersAPI.getCostCenters();
            }
        }
    });
    /**
     * END ROUTER FOR PEERS
     */

    /**
     * ROUTER FOR PROFILES
     */
    $routeProvider.when("/profiles", {
        templateUrl: "view/profiles.html",
        controller: "profilesController",
        resolve: {
            profiles: function (profilesAPI) {
                return profilesAPI.getProfiles();
            },
            profile: function () {
                return "";
            },
            outRoutes: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newProfile/:id", {
        templateUrl: "view/newProfile.html",
        controller: "profilesController",
        resolve: {
            profiles: function () {
                return "";
            },
            profile: function (profilesAPI, $route) {
                return profilesAPI.getProfile($route.current.params.id);
            },
            outRoutes: function (outRoutesAPI) {
                return outRoutesAPI.getOutRoutes();
            }
        }
    });

    $routeProvider.when("/newProfile", {
        templateUrl: "view/newProfile.html",
        controller: "profilesController",
        resolve: {
            profiles: function () {
                return "";
            },
            profile: function () {
                return "";
            },
            outRoutes: function (outRoutesAPI) {
                return outRoutesAPI.getOutRoutes();
            }
        }
    });
    /**
     * END ROUTER FOR PROFILES
     */

    /**
     * ROUTER FOR GROUPS
     */
    $routeProvider.when("/groups", {
        templateUrl: "view/groups.html",
        controller: "groupsController",
        resolve: {
            groups: function (groupsAPI) {
                return groupsAPI.getGroups();
            },
            group: function () {
                return "";
            },
            peers: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newGroup/:id", {
        templateUrl: "view/newGroup.html",
        controller: "groupsController",
        resolve: {
            groups: function () {
                return "";
            },
            group: function (groupsAPI, $route) {
                return groupsAPI.getGroup($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            }
        }
    });

    $routeProvider.when("/newGroup", {
        templateUrl: "view/newGroup.html",
        controller: "groupsController",
        resolve: {
            groups: function () {
                return "";
            },
            group: function () {
                return "";
            },
            peers: function () {
                return "";
            }
        }
    });
    /**
     * END ROUTER FOR GROUPS
     */

    /**
     * ROUTER FOR CATEGORIES
     */
    $routeProvider.when("/categories", {
        templateUrl: "view/categories.html",
        controller: "categoriesController",
        resolve: {
            categories: function (categoriesAPI) {
                return categoriesAPI.getCategories();
            },
            category: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newCategory/:id", {
        templateUrl: "view/newCategory.html",
        controller: "categoriesController",
        resolve: {
            categories: function () {
                return "";
            },
            category: function (categoriesAPI, $route) {
                return categoriesAPI.getCategory($route.current.params.id);
            }
        }
    });

    $routeProvider.when("/newCategory", {
        templateUrl: "view/newCategory.html",
        controller: "categoriesController",
        resolve: {
            categories: function () {
                return "";
            },
            category: function () {
                return "";
            }
        }
    });
    /**
     * END ROUTER FOR CATEGORIES
     */

    /**
     * ROUTER FOR MEETMES
     */
    $routeProvider.when("/meetmes", {
        templateUrl: "view/meetmes.html",
        controller: "meetmesController",
        resolve: {
            meetmes: function (meetmesAPI) {
                return meetmesAPI.getMeetmes();
            },
            meetme: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newMeetme/:id", {
        templateUrl: "view/newMeetme.html",
        controller: "meetmesController",
        resolve: {
            meetmes: function () {
                return "";
            },
            meetme: function (meetmesAPI, $route) {
                return meetmesAPI.getMeetme($route.current.params.id);
            }
        }
    });

    $routeProvider.when("/newMeetme", {
        templateUrl: "view/newMeetme.html",
        controller: "meetmesController",
        resolve: {
            meetmes: function () {
                return "";
            },
            meetme: function () {
                return "";
            }
        }
    });
    /**
     * END ROUTER FOR MEETMES
     */

    /**
     * ROUTER FOR USERS
     */
    $routeProvider.when("/users", {
        templateUrl: "view/users.html",
        controller: "usersController",
        resolve: {
            users: function (usersAPI) {
                return usersAPI.getUsers();
            },
            user: function () {
                return "";
            },
            permissions: function () {
                return "";
            },
            costCenters: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newUser/:id", {
        templateUrl: "view/newUser.html",
        controller: "usersController",
        resolve: {
            users: function () {
                return "";
            },
            user: function (usersAPI, $route) {
                return usersAPI.getUser($route.current.params.id);
            },
            permissions: function (permissionsAPI) {
                return permissionsAPI.getPermissions();
            },
            costCenters: function (costCentersAPI) {
                return costCentersAPI.getCostCenters();
            }
        }
    });

    $routeProvider.when("/newUser", {
        templateUrl: "view/newUser.html",
        controller: "usersController",
        resolve: {
            users: function () {
                return "";
            },
            user: function () {
                return "";
            },
            permissions: function (permissionsAPI) {
                return permissionsAPI.getPermissions();
            },
            costCenters: function (costCentersAPI) {
                return costCentersAPI.getCostCenters();
            }
        }
    });
    /**
     * END ROUTER FOR USERS
     */
    /**
     * ROUTER FOR COSTCENTERS
     */
    $routeProvider.when("/costCenters", {
        templateUrl: "view/costCenters.html",
        controller: "costCentersController",
        resolve: {
            costCenters: function (costCentersAPI) {
                return costCentersAPI.getCostCenters();
            },
            costCenter: function () {
                return "";
            },
            peers: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newCostCenter/:id", {
        templateUrl: "view/newCostCenter.html",
        controller: "costCentersController",
        resolve: {
            costCenters: function () {
                return "";
            },
            costCenter: function (costCentersAPI, $route) {
                return costCentersAPI.getCostCenter($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            }
        }
    });

    $routeProvider.when("/newCostCenter", {
        templateUrl: "view/newCostCenter.html",
        controller: "costCentersController",
        resolve: {
            costCenters: function () {
                return "";
            },
            costCenter: function () {
                return "";
            },
            peers: function () {
                return "";
            }
        }
    });
    /**
     * END ROUTER FOR COSTCENTERS
     */

     /**
     * ROUTER FOR QUEUES
     */
    $routeProvider.when("/queues", {
        templateUrl: "view/queues.html",
        controller: "queuesController",
        resolve: {
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            queue: function () {
                return "";
            },
            peers: function () {
                return "";
            },
            users: function () {
                return "";
            },
            mohs: function () {
                return "";
            },
            ivrs: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newQueue/:id", {
        templateUrl: "view/newQueue.html",
        controller: "queuesController",
        resolve: {
            queues: function () {
                return "";
            },
            queue: function (queuesAPI, $route) {
                return queuesAPI.getQueue($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            users: function (usersAPI) {
                return usersAPI.getUsers();
            },
            mohs: function (mohsAPI) {
                return mohsAPI.getMohs();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });

    $routeProvider.when("/newQueue", {
        templateUrl: "view/newQueue.html",
        controller: "queuesController",
        resolve: {
            queues: function () {
                return "";
            },
            queue: function () {
                return "";
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            users: function (usersAPI) {
                return usersAPI.getUsers();
            },
            mohs: function (mohsAPI) {
                return mohsAPI.getMohs();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });
    /**
     * END ROUTER FOR QUEUES
     */

     /**
     * ROUTER FOR MOHS
     */
    $routeProvider.when("/mohs", {
        templateUrl: "view/mohs.html",
        controller: "mohsController",
        resolve: {
            mohs: function (mohsAPI) {
                return mohsAPI.getMohs();
            },
            moh: function () {
                return "";
            },
        }
    });

    $routeProvider.when("/newMoh/:id", {
        templateUrl: "view/newMoh.html",
        controller: "mohsController",
        resolve: {
            mohs: function () {
                return "";
            },
            moh: function (mohsAPI, $route) {
                return mohsAPI.getMoh($route.current.params.id);
            },
        }
    });

    $routeProvider.when("/newMoh", {
        templateUrl: "view/newMoh.html",
        controller: "mohsController",
        resolve: {
            mohs: function () {
                return "";
            },
            moh: function () {
                return "";
            },
        }
    });
    /**
     * END ROUTER FOR MOHS
     */

    /**
     * ROUTER FOR CUSTOMRULES
     */
    $routeProvider.when("/customRules", {
        templateUrl: "view/customRules.html",
        controller: "customRulesController",
        resolve: {
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            ivr: function () {
                return "";
            },
            queues: function () {
                return "";
            },
            peers: function () {
                return "";
            },
        }
    });

    $routeProvider.when("/newCustomRule/:id", {
        templateUrl: "view/newCustomRule.html",
        controller: "customRulesController",
        resolve: {
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            ivr: function (ivrsAPI, $route) {
                return ivrsAPI.getIvr($route.current.params.id);
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
        }
    });

    $routeProvider.when("/newCustomRule", {
        templateUrl: "view/newCustomRule.html",
        controller: "customRulesController",
        resolve: {
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            ivr: function () {
                return "";
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
        }
    });
    /**
     * END ROUTER FOR CUSTOMRULES
     */

    /**
     * ROUTER FOR IVRS
     */
    $routeProvider.when("/ivrs", {
        templateUrl: "view/ivrs.html",
        controller: "ivrsController",
        resolve: {
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            ivr: function () {
                return "";
            },
            queues: function () {
                return "";
            },
            peers: function () {
                return "";
            },
        }
    });

    $routeProvider.when("/newIvr/:id", {
        templateUrl: "view/newIvr.html",
        controller: "ivrsController",
        resolve: {
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            ivr: function (ivrsAPI, $route) {
                return ivrsAPI.getIvr($route.current.params.id);
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
        }
    });

    $routeProvider.when("/newIvr", {
        templateUrl: "view/newIvr.html",
        controller: "ivrsController",
        resolve: {
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            ivr: function () {
                return "";
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
        }
    });
    /**
     * END ROUTER FOR IVRS
     */

     /**
     * ROUTER FOR CONTACTS
     */
    $routeProvider.when("/contacts", {
        templateUrl: "view/contacts.html",
        controller: "contactsController",
        resolve: {
            contacts: function (contactsAPI) {
                return contactsAPI.getContacts();
            },
            contact: function () {
                return "";
            },
        }
    });

    $routeProvider.when("/newContact/:id", {
        templateUrl: "view/newContact.html",
        controller: "contactsController",
        resolve: {
            contacts: function () {
                return "";
            },
            contact: function (contactsAPI, $route) {
                return contactsAPI.getContact($route.current.params.id);
            },
        }
    });

    $routeProvider.when("/newContact", {
        templateUrl: "view/newContact.html",
        controller: "contactsController",
        resolve: {
            contacts: function () {
                return "";
            },
            contact: function () {
                return "";
            },
        }
    });
    /**
     * END ROUTER FOR CONTACTS
     */

     /**
     * ROUTER FOR EVENTS
     */
    $routeProvider.when("/events", {
        templateUrl: "view/events.html",
        controller: "eventsController",
        resolve: {
            events: function (eventsAPI) {
                return eventsAPI.getEvents();
            },
            event: function () {
                return "";
            },
            peers: function () {
                return "";
            },
            queues: function () {
                return "";
            },
            ivrs: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newEvent/:id", {
        templateUrl: "view/newEvent.html",
        controller: "eventsController",
        resolve: {
            events: function () {
                return "";
            },
            event: function (eventsAPI, $route) {
                return eventsAPI.getEvent($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });

    $routeProvider.when("/newEvent", {
        templateUrl: "view/newEvent.html",
        controller: "eventsController",
        resolve: {
            events: function () {
                return "";
            },
            event: function () {
                return "";
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });
    /**
     * END ROUTER FOR EVENTS
     */

    /**
     * ROUTER FOR SERVICEHOURS
     */
    $routeProvider.when("/serviceHours", {
        templateUrl: "view/serviceHours.html",
        controller: "serviceHoursController",
        resolve: {
            serviceHours: function (serviceHoursAPI) {
                return serviceHoursAPI.getServiceHours();
            },
            serviceHour: function () {
                return "";
            },
            peers: function () {
                return "";
            },
            queues: function () {
                return "";
            },
            ivrs: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newServiceHour/:id", {
        templateUrl: "view/newServiceHour.html",
        controller: "serviceHoursController",
        resolve: {
            serviceHours: function () {
                return "";
            },
            serviceHour: function (serviceHoursAPI, $route) {
                return serviceHoursAPI.getServiceHour($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });

    $routeProvider.when("/newServiceHour", {
        templateUrl: "view/newServiceHour.html",
        controller: "serviceHoursController",
        resolve: {
            serviceHours: function () {
                return "";
            },
            serviceHour: function () {
                return "";
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });
    /**
     * END ROUTER FOR SERVICEHOURS
     */

    /**
     * ROUTER FOR TRUNKS
     */
    $routeProvider.when("/trunks", {
        templateUrl: "view/trunks.html",
        controller: "trunksController",
        resolve: {
            trunks: function (trunksAPI) {
                return trunksAPI.getTrunks();
            },
            trunk: function () {
                return "";
            },
        }
    });

    $routeProvider.when("/newTrunk/:id", {
        templateUrl: "view/newTrunk.html",
        controller: "trunksController",
        resolve: {
            trunks: function () {
                return "";
            },
            trunk: function (trunksAPI, $route) {
                return trunksAPI.getTrunk($route.current.params.id);
            },
        }
    });

    $routeProvider.when("/newTrunk", {
        templateUrl: "view/newTrunk.html",
        controller: "trunksController",
        resolve: {
            trunks: function () {
                return "";
            },
            trunk: function () {
                return "";
            },
        }
    });
    /**
     * END ROUTER FOR TRUNKS
     */

    /**
     * ROUTER FOR INTERNALROUTES
     */
    $routeProvider.when("/internalRoutes", {
        templateUrl: "view/internalRoutes.html",
        controller: "internalRoutesController",
        resolve: {
            internalRoutes: function (internalRoutesAPI) {
                return internalRoutesAPI.getInternalRoutes();
            },
            internalRoute: function () {
                return "";
            },
            peers: function () {
                return "";
            },
            queues: function () {
                return "";
            },
            ivrs: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newInternalRoute/:id", {
        templateUrl: "view/newInternalRoute.html",
        controller: "internalRoutesController",
        resolve: {
            internalRoutes: function () {
                return "";
            },
            internalRoute: function (internalRoutesAPI, $route) {
                return internalRoutesAPI.getInternalRoute($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });

    $routeProvider.when("/newInternalRoute", {
        templateUrl: "view/newInternalRoute.html",
        controller: "internalRoutesController",
        resolve: {
            internalRoutes: function () {
                return "";
            },
            internalRoute: function () {
                return "";
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });
    /**
     * END ROUTER FOR INTERNALROUTES
     */

    /**
     * ROUTER FOR INROUTES
     */
    $routeProvider.when("/inRoutes", {
        templateUrl: "view/inRoutes.html",
        controller: "inRoutesController",
        resolve: {
            inRoutes: function (inRoutesAPI) {
                return inRoutesAPI.getInRoutes();
            },
            inRoute: function () {
                return "";
            },
            peers: function () {
                return "";
            },
            queues: function () {
                return "";
            },
            ivrs: function () {
                return "";
            },
            trunks: function (trunksAPI) {
                return trunksAPI.getTrunks();
            },
            internalRoutes: function () {
                return "";
            },
            outRoutes: function () {
                return "";
            },
            callbacks: function () {
                return "";
            },
        }
    });

    $routeProvider.when("/newInRoute/:id", {
        templateUrl: "view/newInRoute.html",
        controller: "inRoutesController",
        resolve: {
            inRoutes: function () {
                return "";
            },
            inRoute: function (inRoutesAPI, $route) {
                return inRoutesAPI.getInRoute($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            trunks: function (trunksAPI) {
                return trunksAPI.getTrunks();
            },
            internalRoutes: function (internalRoutesAPI) {
                return internalRoutesAPI.getInternalRoutes();
            },
            outRoutes: function (outRoutesAPI) {
                return outRoutesAPI.getOutRoutes();
            },
            callbacks: function (callbacksAPI) {
                return callbacksAPI.getCallbacks();
            },
        }
    });

    $routeProvider.when("/newInRoute", {
        templateUrl: "view/newInRoute.html",
        controller: "inRoutesController",
        resolve: {
            inRoutes: function () {
                return "";
            },
            inRoute: function () {
                return "";
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            trunks: function (trunksAPI) {
                return trunksAPI.getTrunks();
            },
            internalRoutes: function (internalRoutesAPI) {
                return internalRoutesAPI.getInternalRoutes();
            },
            outRoutes: function (outRoutesAPI) {
                return outRoutesAPI.getOutRoutes();
            },
            callbacks: function (callbacksAPI) {
                return callbacksAPI.getCallbacks();
            },
        }
    });
    /**
     * END ROUTER FOR INROUTES
     */

     /**
     * ROUTER FOR OUTROUTES
     */
    $routeProvider.when("/outRoutes", {
        templateUrl: "view/outRoutes.html",
        controller: "outRoutesController",
        resolve: {
            outRoutes: function (outRoutesAPI) {
                return outRoutesAPI.getOutRoutes();
            },
            outRoute: function () {
                return "";
            },
            peers: function () {
                return "";
            },
            queues: function () {
                return "";
            },
            ivrs: function () {
                return "";
            },
            trunks: function () {
                return "";
            }
        }
    });

    $routeProvider.when("/newOutRoute/:id", {
        templateUrl: "view/newOutRoute.html",
        controller: "outRoutesController",
        resolve: {
            outRoutes: function () {
                return "";
            },
            outRoute: function (outRoutesAPI, $route) {
                return outRoutesAPI.getOutRoute($route.current.params.id);
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            trunks: function (trunksAPI) {
                return trunksAPI.getTrunks();
            }
        }
    });

    $routeProvider.when("/newOutRoute", {
        templateUrl: "view/newOutRoute.html",
        controller: "outRoutesController",
        resolve: {
            outRoutes: function () {
                return "";
            },
            outRoute: function () {
                return "";
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            },
            trunks: function (trunksAPI) {
                return trunksAPI.getTrunks();
            }
        }
    });
    /**
     * END ROUTER FOR OUTROUTES
     */


    /**
     * ROUTER FOR CALLBACKS
     */
    $routeProvider.when("/callbacks", {
        templateUrl: "view/callbacks.html",
        controller: "callbacksController",
        resolve: {
            callbacks: function (callbacksAPI) {
                return callbacksAPI.getCallbacks();
            },
            callback: function () {
                return "";
            },
            profiles: function () {
                return "";
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });

    $routeProvider.when("/newCallback/:id", {
        templateUrl: "view/newCallback.html",
        controller: "callbacksController",
        resolve: {
            callbacks: function () {
                return "";
            },
            callback: function (callbacksAPI, $route) {
                return callbacksAPI.getCallback($route.current.params.id);
            },
            profiles: function (profilesAPI) {
                return profilesAPI.getProfiles();
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });

    $routeProvider.when("/newCallback", {
        templateUrl: "view/newCallback.html",
        controller: "callbacksController",
        resolve: {
            callbacks: function () {
                return "";
            },
            callback: function () {
                return "";
            },
            profiles: function (profilesAPI) {
                return profilesAPI.getProfiles();
            },
            peers: function (peersAPI) {
                return peersAPI.getPeers();
            },
            queues: function (queuesAPI) {
                return queuesAPI.getQueues();
            },
            ivrs: function (ivrsAPI) {
                return ivrsAPI.getIvrs();
            }
        }
    });
    /**
     * END ROUTER FOR CALLBACKS
     */

    /**
     * ROUTER FOR ERROR
     */
    $routeProvider.when("/error", {
        templateUrl: "view/error.html"
    });
    /**
     * END ROUTER FOR ERROR
     */

     /**
     * ROUTER FOR LOGIN
     */
    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller: "authController"
    });
    /**
     * END ROUTER FOR ERROR
     */

    /**
     * TODO: alterar para index
     * 
     * DEFAULT ROUTER
     */
    $routeProvider.otherwise({redirectTo: "/login"});
});