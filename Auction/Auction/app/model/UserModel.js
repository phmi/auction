Ext.define("Auction.model.UserModel", {
    extend: "Ext.data.Model",
    fields: [
        { name: "Id", type: "int" },
        { name: "Name", type: "string" },
        { name: "IsAdmin", type: "boolean" },
        { name: "IsModerator", type: "boolean" }
    ],
    idProperty: "Id"
});