Ext.define("Auction.model.LotModel", {
    extend: "Ext.data.Model",
    fields: [
        { name: "Id", type: "int" },
        { name: "Name", type: "string" },
        { name: "Description", type: "string" },
        { name: "DateTime", type: "date", dateFormat: "MS" },
        { name: "Hidden", type: "boolean" },
        { name: "Price", type: "number" },
        { name: "User", type: "string" }
    ],
    idProperty: "Id"
});