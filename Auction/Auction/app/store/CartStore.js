Ext.define("Auction.store.CartStore", {
    extend: "Ext.data.Store",
    requires: ["Auction.tool.AftAjaxProxy"],
    model: "Auction.model.CartItemModel",
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: "aftajax",
        api: {
            read: "Cart/Items",
            destroy: "Cart/Remove"
        },
        reader: {
            type: "json",
            root: "Items",
            totalProperty : "TotalCount"
        }
    }
});