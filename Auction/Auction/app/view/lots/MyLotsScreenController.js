Ext.define("Auction.view.lots.MyLotsScreenController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.myLotsScreen",

    requires: [
        "Auction.store.MyLotsStore",
        "Auction.view.lots.AddMyLotWindow",
        "Auction.view.lots.EditMyLotWindow"
    ],

    init: function() {
        var self = this;
        self.onGridSelectionChange();
        self.store = Ext.create("Auction.store.MyLotsStore");
        self.store.on("load", self.onStoreLoad, self);
        self.lookupReference("lotsPager").bindStore(self.store);
        self.lookupReference("lotsGrid").reconfigure(self.store);
    },

    onStoreLoad: function () {
        var self = this;
        self.onGridSelectionChange();
    },

    onGridSelectionChange: function () {
        var self = this;
        var selections = self.lookupReference("lotsGrid").getSelectionModel().getSelection();
        if (selections.length === 0) {
            self.lookupReference("editButton").disable();
            self.lookupReference("removeButton").disable();
        } else {
            self.lookupReference("editButton").enable();
            self.lookupReference("removeButton").enable();
        }
    },

    onAddClick: function() {
        var self = this;
        Ext.create({
            xtype: "addMyLotWindow",
            store: self.store
        });
    },

    onEditClick: function () {
        var self = this;
        var record = self.lookupReference("lotsGrid").getSelectionModel().getSelection()[0];
        Ext.create({
            xtype: "editMyLotWindow",
            record: record,
            store: self.store
        });
    },

    onRemoveClick: function() {
        var self = this;
        var record = self.lookupReference("lotsGrid").getSelectionModel().getSelection()[0];
        Ext.MessageBox.confirm("Удалить лот", "Удалить \"" + record.data.Name + "\"?", function (btn) {
            if (btn === "yes") {
                self.store.remove(record);
            }
        });
    }
});