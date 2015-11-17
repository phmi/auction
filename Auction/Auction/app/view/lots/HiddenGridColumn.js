Ext.define("Auction.view.lots.HiddenGridColumn", {
    xtype: "hiddenGridColumn",
    extend: "Ext.grid.column.Boolean",
    header: "Видимость",
    dataIndex: "Hidden",
    trueText: "Не видим",
    falseText: "Видим",
    sortable: false
});