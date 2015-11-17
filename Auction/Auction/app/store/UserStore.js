Ext.define("Auction.store.UserStore", {
    extend: "Ext.data.Store",
    requires: ["Auction.tool.AftAjaxProxy"],
    model: "Auction.model.UserModel",
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: "aftajax",
        api: {
            read: "Users",
            update: "Users/Update",
            destroy: "Users/Remove"
        },
        reader: {
            type: "json",
            root: "Users",
            totalProperty: "TotalCount"
        },
        writer: {
            type: "json",
            writeAllFields: true,
            root: "Users"
        }
    }
});