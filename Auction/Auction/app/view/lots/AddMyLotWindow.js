Ext.define("Auction.view.lots.AddMyLotWindow", {
    extend: "Ext.window.Window",
    xtype: "addMyLotWindow",

    requires: [
        "Auction.view.lots.AddMyLotWindowController"
    ],

    controller: "addMyLotWindow",

    config: {
        store: null
    },

    title: "Добавить лот",
    iconCls: "icon-add",
    autoShow: true,
    modal: true,

    items: {
        xtype: "form",
        reference: "form",
        items: [
            {
                xtype: "textfield",
                reference: "nameTextField",
                fieldLabel: "Название",
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            },
            {
                xtype: "textarea",
                reference: "descriptionTextArea",
                fieldLabel: "Описание"
            },
            {
                xtype: "numberfield",
                reference: "priceNumberField",
                fieldLabel: "Цена, тг",
                allowBlank: false,
                minValue: 0,
                decimalPrecision: 2,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            }
        ],
        buttons: [
            {
                text: "Добавить",
                formBind: true,
                listeners: {
                    click: "onAddClick"
                }
            }
        ]
    },

    listeners: {
        show: function (win) {
            win.down("textfield[reference=nameTextField]").focus();
        }
    }
});