Ext.define("Auction.store.MyLotsStore", {
    extend: "Ext.data.Store",
    requires: ["Auction.tool.AftAjaxProxy"],
    model: "Auction.model.LotModel",
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: "aftajax",
        api: {
            create: "MyLots/Add",
            read: "MyLots",
            update: "MyLots/Update",
            destroy: "MyLots/Remove"
        },
        reader: {
            type: "json",
            root: "Lots",
            totalProperty: "TotalCount"
        },
        writer: {
            type: "json",
            writeAllFields: true
        }
    }
});