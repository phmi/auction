Ext.define("Auction.view.lots.EditMyLotWindow", {
    extend: "Ext.window.Window",
    xtype: "editMyLotWindow",

    requires: [
        "Auction.view.lots.EditMyLotWindowController"
    ],

    controller: "editMyLotWindow",

    config: {
        store: null,
        record: null
    },

    title: "Изменить лот",
    iconCls: "icon-edit",
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
                text: "Изменить",
                formBind: true,
                listeners: {
                    click: "onEditClick"
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