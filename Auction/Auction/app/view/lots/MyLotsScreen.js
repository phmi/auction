Ext.define("Auction.view.lots.MyLotsScreen", {
    extend: "Ext.panel.Panel",
    xtype: "myLotsScreen",
    layout: "fit",

    requires: [
        "Auction.view.lots.MyLotsScreenController",
        "Auction.view.lots.HiddenGridColumn"
    ],

    controller: "myLotsScreen",

    title: "Мои лоты",

    items: [
        {
            region: "center",
            xtype: "grid",
            reference: "lotsGrid",
            plugins: [
                {
                    ptype: "cellediting",
                    clicksToEdit: 2
                },
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
                    sortable: false,
                    editor: {
                        xtype: "textfield",
                        allowBlank: false
                    }
                },
                {
                    header: "Цена",
                    dataIndex: "Price",
                    renderer: Ext.util.Format.numberRenderer("0,000.00 тг"),
                    minWidth: 150,
                    sortable: false,
                    editor: {
                        xtype: "numberfield",
                        allowBlank: false,
                        minValue: 0,
                        decimalPrecision: 2
                    }
                },
                {
                    header: "Продавец",
                    dataIndex: "User",
                    sortable: false
                },
                {
                    xtype: "hiddenGridColumn"
                }
            ],
            dockedItems: [
                {
                    xtype: "toolbar",
                    reference: "toolbar",
                    items: [
                        {
                            iconCls: "icon-add",
                            text: "Добавить",
                            handler: "onAddClick"
                        },
                        {
                            reference: "editButton",
                            iconCls: "icon-edit",
                            text: "Изменить",
                            handler: "onEditClick"
                        },
                        {
                            reference: "removeButton",
                            iconCls: "icon-delete",
                            text: "Удалить",
                            handler: "onRemoveClick"
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