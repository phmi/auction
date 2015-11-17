Ext.define("Auction.view.cart.CartScreenController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.cartScreen",

    requires: [
        "Auction.store.CartStore"
    ],

    init: function () {
        var self = this;
        self.store = Ext.create("Auction.store.CartStore");
        self.store.on("load", self.onStoreLoad, self);
        self.store.on("write", self.onStoreWrite, self);
        self.lookupReference("cartPager").bindStore(self.store);
        self.lookupReference("cartGrid").reconfigure(self.store);
    },

    onStoreLoad: function () {
        var self = this;
        self.onGridSelectionChange();
    },

    onStoreWrite: function () {
        Ext.GlobalEvents.fireEvent("cartChanged");
    },

    onGridSelectionChange: function () {
        var self = this;
        var selections = self.lookupReference("cartGrid").getSelectionModel().getSelection();
        if (selections.length === 0) {
            self.lookupReference("removeButton").disable();
        } else {
            self.lookupReference("removeButton").enable();
        }
    },

    onRemoveButtonClick: function () {
        var self = this;
        var record = self.lookupReference("cartGrid").getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm("Удалить из корзины", "Удалить \"" + record.data.Name + "\"?", function (btn) {
            if (btn === "yes") {
                self.store.remove(record);
            }
        });
    }
});