Ext.define("Auction.view.lots.EditMyLotWindowController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.editMyLotWindow",

    init: function () {
        var self = this;
        var record = self.getView().record;
        self.lookupReference("nameTextField").setValue(record.data.Name);
        self.lookupReference("descriptionTextArea").setValue(record.data.Description);
        self.lookupReference("priceNumberField").setValue(record.data.Price);
    },

    onEditClick: function () {
        var self = this;
        var form = self.lookupReference("form");
        if (!form.isValid())
            return;
        self.getView().store.setAutoSync(false);
        var record = self.getView().record;
        record.set("Name", self.lookupReference("nameTextField").value);
        record.set("Description", self.lookupReference("descriptionTextArea").value);
        record.set("Price", self.lookupReference("priceNumberField").value);
        self.getView().store.setAutoSync(true);
        self.getView().store.sync();
        self.getView().destroy();
    },

    onSpecialKey: function (field, e) {
        var self = this;
        if (e.getKey() === e.ENTER) {
            self.onEditClick();
        }
    }
});