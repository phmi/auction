Ext.define("Auction.view.lots.AddMyLotWindowController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.addMyLotWindow",
    
    requires: ["Auction.model.LotModel"],

    onAddClick: function () {
        var self = this;
        var form = self.lookupReference("form");
        if (!form.isValid())
            return;
        var record = Ext.create("Auction.model.LotModel", {
            Name: self.lookupReference("nameTextField").value,
            Description: self.lookupReference("descriptionTextArea").value,
            Price: self.lookupReference("priceNumberField").value
        });
        self.getView().store.add(record);
        self.getView().destroy();
    },

    onSpecialKey: function (field, e) {
        var self = this;
        if (e.getKey() === e.ENTER) {
            self.onAddClick();
        }
    }
});