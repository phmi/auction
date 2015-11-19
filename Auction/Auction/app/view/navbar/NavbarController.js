Ext.define("Auction.view.navbar.NavbarController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.navbar",

    requires: [
        "Auction.view.login.LoginWindow",
        "Auction.view.lots.LotsScreen",
        "Auction.view.lots.MyLotsScreen",
        "Auction.view.users.UsersScreen",
        "Auction.view.AboutScreen",
        "Auction.view.cart.CartScreen"
    ],

    init: function () {
        var self = this;

        var currentUserStr = sessionStorage.getItem("currentUser");
        if (currentUserStr) {
            self.onUserChanged(Ext.JSON.decode(currentUserStr), true);
        }

        self.requestAjax({
            url: "Account/CurrentUser",
            success: function (result) {
                self.onUserChanged(result.User, true);
            }
        });
    },

    onUserChanged: function (user, skipRefreshToken) {
        var self = this;
        if (!user) {
            self.lookupReference("myLotsButton").hide();
            self.lookupReference("loginButton").show();
            self.lookupReference("userButton").hide();
        } else {
            self.lookupReference("myLotsButton").show();
            self.lookupReference("loginButton").hide();
            var userButton = self.lookupReference("userButton");
            userButton.show();
            userButton.setText(user.Name);
        }
        if (!user || !user.IsAdmin) {
            self.lookupReference("usersButton").hide();
        } else {
            self.lookupReference("usersButton").show();
        }
        if (!skipRefreshToken) {
            Ext.Ajax.request({
                url: "Account/RefreshToken",
                success: function (response) {
                    window.__RequestVerificationToken = response.responseText.split("value=\"")[1].split("\"")[0];
                }
            });
        }
        if (user) {
            sessionStorage.setItem("currentUser", Ext.util.JSON.encode(user));
        } else {
            sessionStorage.removeItem("currentUser");
        }
        Ext.GlobalEvents.fireEvent("currentUserChanged", user);
    },

    onLoginClick: function () {
        var self = this;
        Ext.create({
            xtype: "loginWindow",
            listeners: {
                userChanged: function(user) {
                    self.onUserChanged(user);
                }
            }
        });
    },
    
    onLogoutClick: function() {
        var self = this;
        self.requestAjax({
            url: "Account/LogOff",
            success: function () {
                self.onUserChanged();
                self.redirectTo("lots");
            }
        });
    },

    routes: {
        "lots": "onLots",
        "mylots": "onMyLots",
        "users": "onUsers",
        "about": "onAbout",
        "cart": "onCart"
    },
    
    onLots: function () {
        var self = this;
        self.selectScreen("lotsScreen");
    },

    onLotsClick: function() {
        var self = this;
        self.redirectTo("lots", true);
    },

    onMyLots: function () {
        var self = this;
        self.selectScreen("myLotsScreen");
    },
    
    onMyLotsClick: function () {
        var self = this;
        self.redirectTo("mylots", true);
    },

    onUsers: function() {
        var self = this;
        self.selectScreen("usersScreen");
    },
    
    onUsersClick: function() {
        var self = this;
        self.redirectTo("users", true);
    },

    onAbout: function () {
        var self = this;
        self.selectScreen("aboutScreen");
    },
    
    onAboutClick: function () {
        var self = this;
        self.redirectTo("about", true);
    },

    onCart: function() {
        var self = this;
        self.selectScreen("cartScreen");
    },

    onCartClick: function () {
        var self = this;
        self.redirectTo("cart", true);
    },
    
    selectScreen: function(xtype) {
        var self = this;
        self.getView().fireEvent("screenSelected", Ext.create({xtype: xtype}));
    }
});