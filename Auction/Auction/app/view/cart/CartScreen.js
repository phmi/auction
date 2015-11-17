Ext.define("Auction.view.cart.CartScreen", {
    extend: "Ext.panel.Panel",
    xtype: "cartScreen",
    layout: "fit",

    requires: [
        "Auction.view.cart.CartScreenController"
    ],

    controller: "cartScreen",

    title: "Корзина",

    items: [
        {
            region: "center",
            xtype: "grid",
            reference: "cartGrid",
            plugins: [
                {
                    ptype: "rowexpander",
                    rowBodyTpl: [
                        "<p>{Description}</p>"
                    ]
                }
            ],
            columns: [
                {
                    xtype: "datecolumn",
                    header: "Дата",
                    dataIndex: "DateTime",
                    format: "d.m.Y H:i",
                    minWidth: 130,
                    sortable: false
                },
                {
                    header: "Название",
                    dataIndex: "Name",
                    minWidth: 150,
                    sortable: false
                },
                {
                    header: "Цена",
                    dataIndex: "Price",
                    renderer: Ext.util.Format.numberRenderer("0,000.00 тг"),
                    minWidth: 150,
                    sortable: false
                },
                {
                    header: "Продавец",
                    dataIndex: "User",
                    sortable: false
                }
            ],
            dockedItems: [
                {
                    xtype: "toolbar",
                    reference: "toolbar",
                    items: [
                        {
                            reference: "removeButton",
                            text: "Удалить",
                            iconCls: "icon-delete",
                            handler: "onRemoveButtonClick",
                            disabled: true
                        }
                    ]
                },
                {
                    xtype: "pagingtoolbar",
                    reference: "cartPager",
                    dock: "bottom",
                    displayInfo: true
                }
            ],
            listeners: {
                selectionchange: "onGridSelectionChange"
            }
        }
    ]
});