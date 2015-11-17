Ext.define("Auction.view.users.AddUserWindowController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.addUserWindow",

    onAddClick: function () {
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
            url: "Users/Add",
            params: {
                Name: self.lookupReference("userNameTextField").value,
                password: self.lookupReference("passwordTextField").value,
                IsAdmin: self.lookupReference("isAdminCheckBox").value,
                IsModerator: self.lookupReference("isModeratorCheckBox").value
            },
            success: function () {
                self.getView().fireEvent("userAdded");
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
            self.onAddClick();
        }
    }
});