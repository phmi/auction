Ext.define("Auction.view.users.SetPasswordWindowController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.setPasswordWindow",

    onSetPasswordClick: function () {
        var self = this;
        var form = self.lookupReference("form");
        if (!form.isValid())
            return;
        if (self.lookupReference("passwordTextField").value !== self.lookupReference("confirmPasswordTextField").value) {
            Ext.Msg.show({
                title: "Ошибка",
                message: "Пароли не совпадают",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return;
        }
        self.getView().disable();
        self.requestAjax({
            url: "Users/SetPassword",
            params: {
                id: self.getView().userId,
                password: self.lookupReference("passwordTextField").value
            },
            success: function () {
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
            self.onSetPasswordClick();
        }
    }
});