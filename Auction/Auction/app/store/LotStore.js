Ext.define("Auction.store.LotStore", {
    extend: "Ext.data.Store",
    requires: ["Auction.tool.AftAjaxProxy"],
    model: "Auction.model.LotModel",
    autoLoad: true,
    proxy: {
        type: "aftajax",
        api: {
            read: "Lots"
        },
        reader: {
            type: "json",
            root: "Lots",
            totalProperty : "TotalCount"
        }
    }
});