Ext.define("Auction.view.users.UsersScreenController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.usersScreen",

    requires: [
        "Auction.store.UserStore",
        "Auction.view.users.SetPasswordWindow",
        "Auction.view.users.AddUserWindow"
    ],

    init: function () {
        var self = this;
        self.store = Ext.create("Auction.store.UserStore");
        self.lookupReference("usersPager").bindStore(self.store);
        self.lookupReference("usersGrid").reconfigure(self.store);
    },

    onAddClick: function () {
        var self = this;
        Ext.create({
            xtype: "addUserWindow",
            listeners: {
                userAdded: function () {
                    self.store.load();
                }
            }
        });
    },
    
    onSetPasswordClick: function (grid, rowNum, colNum, item, e, record) {
        Ext.create({
            xtype: "setPasswordWindow",
            userId: record.id,
            userName: record.data.Name
        });
    },

    onRemoveClick: function (grid, rowNum, colNum, item, e, record) {
        var self = this;
        Ext.MessageBox.confirm("Удалить пользователя", "Удалить \"" + record.data.Name + "\"?", function(btn) {
            if (btn === "yes") {
                self.store.remove(record);
            }
        });
    }
});