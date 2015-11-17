Ext.define("Auction.view.users.AddUserWindow", {
    extend: "Ext.window.Window",
    xtype: "addUserWindow",

    requires: [
        "Auction.view.users.AddUserWindowController"
    ],

    controller: "addUserWindow",

    title: "Добавить пользователя",
    iconCls: "icon-user",
    autoShow: true,
    modal: true,

    items: {
        xtype: "form",
        reference: "form",
        items: [
            {
                xtype: "textfield",
                reference: "userNameTextField",
                fieldLabel: "Пользователь",
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            }, {
                xtype: "textfield",
                reference: "passwordTextField",
                inputType: "password",
                fieldLabel: "Пароль",
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            }, {
                xtype: "textfield",
                reference: "confirmPasswordTextField",
                inputType: "password",
                fieldLabel: "Повторите пароль",
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            }, {
                xtype: "checkbox",
                reference: "isAdminCheckBox",
                fieldLabel: "Администратор"
            }, {
                xtype: "checkbox",
                reference: "isModeratorCheckBox",
                fieldLabel: "Модератор"
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
            win.down("textfield[reference=userNameTextField]").focus();
        }
    }
});