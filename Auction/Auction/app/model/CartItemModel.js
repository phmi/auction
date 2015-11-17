Ext.define("Auction.model.CartItemModel", {
    extend: "Ext.data.Model",
    fields: [
        { name: "Id", type: "int" },
        { name: "Name", type: "string" },
        { name: "Description", type: "string" },
        { name: "DateTime", type: "date", dateFormat: "MS" },
        { name: "Price", type: "number" },
        { name: "User", type: "string" }
    ],
    idProperty: "Id"
});