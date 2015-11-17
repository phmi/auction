Ext.define("Auction.view.login.RegisterWindowController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.registerWindow",

    onRegisterClick: function () {
        var self = this;
        var form = self.lookupReference("form");
        if (!form.isValid())
            return;
        var view = self.getView();
        if (view.password !== self.lookupReference("passwordTextField").value) {
            Ext.Msg.show({
                title: "Ошибка",
                message: "Пароли не совпадают",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }
        
        view.disable();
        self.requestAjax({
            url: "Account/Register",
            params: {
                username: view.userName,
                password: view.password,
                rememberMe: view.rememberMe,
                isAdmin: self.lookupReference("isAdminCheckBox").value,
                isModerator: self.lookupReference("isModeratorCheckBox").value
            },
            success: function (result) {
                view.fireEvent("userRegistered", result.User);
                view.destroy();
            },
            failure: function () {
                view.enable();
            }
        });
    },

    onSpecialKey: function (field, e) {
        var self = this;
        if (e.getKey() === e.ENTER) {
            self.onRegisterClick();
        }
    }
});