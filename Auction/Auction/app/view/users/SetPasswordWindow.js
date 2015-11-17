Ext.define("Auction.view.users.SetPasswordWindow", {
    extend: "Ext.window.Window",
    xtype: "setPasswordWindow",

    requires: [
        "Auction.view.users.SetPasswordWindowController"
    ],

    controller: "setPasswordWindow",

    title: "Задать пароль",
    iconCls: "icon-key",
    autoShow: true,
    modal: true,

    config: {
        userName: "",
        userId: 0
    },

    items: {
        xtype: "form",
        reference: "form",
        items: [
            {
                xtype: "textfield",
                reference: "passwordTextField",
                inputType: "password",
                fieldLabel: "Пароль",
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            },
            {
                xtype: "textfield",
                reference: "confirmPasswordTextField",
                inputType: "password",
                fieldLabel: "Повторите пароль",
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            }
        ],
        buttons: [
            {
                text: "Задать",
                formBind: true,
                listeners: {
                    click: "onSetPasswordClick"
                }
            }
        ]
    },

    listeners: {
        activate: function (win) {
            win.down("textfield[reference=passwordTextField]").focus();
        },
        show: function(win) {
            win.setTitle(win.getTitle() + " для \"" + win.userName + "\"");
        }
    }
});