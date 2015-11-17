Ext.define("Auction.view.lots.LotsScreen", {
    extend: "Ext.panel.Panel",
    xtype: "lotsScreen",
    layout: "fit",

    requires: [
        "Auction.view.lots.LotsScreenController"
    ],

    controller: "lotsScreen",

    title: "Лоты",

    items: [
        {
            region: "center",
            xtype: "grid",
            reference: "lotsGrid",
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
                            xtype: "textfield",
                            reference: "searchTextField",
                            emptyText: "Найти",
                            listeners: {
                                specialKey: "onSearchTextFieldSpecialKey"
                            }
                        },
                        {
                            reference: "hideLotButton",
                            text: "Спрятать лот",
                            handler: "onHideLotButtonClick",
                            disabled: true
                        },
                        {
                            reference: "showLotButton",
                            text: "Показывать лот",
                            handler: "onShowLotButtonClick",
                            disabled: true
                        },
                        {
                            reference: "toCartButton",
                            text: "В корзину",
                            iconCls: "icon-cart",
                            handler: "onToCartButtonClick",
                            disabled: true
                        }
                    ]
                },
                {
                    xtype: "pagingtoolbar",
                    reference: "lotsPager",
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