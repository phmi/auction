Ext.define("Auction.view.login.LoginWindowController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.loginWindow",

    requires: [
        "Auction.view.login.RegisterWindow"
    ],

    onRegisterClick: function () {
        var self = this;
        var form = self.lookupReference("form");
        if (!form.isValid())
            return;
        Ext.create({
            xtype: "registerWindow",
            userName: self.lookupReference("userNameTextField").value,
            password: self.lookupReference("passwordTextField").value,
            rememberMe: self.lookupReference("rememberMeCheckBox").value,
            listeners: {
                userRegistered: function(user) {
                    self.getView().fireEvent("userChanged", user);
                    self.getView().destroy();
                }
            }
        });
    },

    onLoginClick: function () {
        var self = this;
        var form = self.lookupReference("form");
        if (!form.isValid())
            return;
        self.getView().disable();
        self.requestAjax({
            url: "Account/LogOn",
            params: {
                username: self.lookupReference("userNameTextField").value,
                password: self.lookupReference("passwordTextField").value,
                rememberMe: self.lookupReference("rememberMeCheckBox").value
            },
            success: function (result) {
                self.getView().fireEvent("userChanged", result.User);
                self.getView().destroy();
            },
            failure: function () {
                self.getView().enable();
            }
        });
    },

    onSpecialKey: function (field, e) {
        var self = this;
        if (e.getKey() === e.ENTER) {
            self.onLoginClick();
        }
    }
});