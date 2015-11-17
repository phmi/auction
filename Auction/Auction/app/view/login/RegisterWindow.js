Ext.define("Auction.view.login.RegisterWindow", {
    extend: "Ext.window.Window",
    xtype: "registerWindow",

    requires: [
        "Auction.view.login.RegisterWindowController"
    ],

    controller: "registerWindow",

    title: "Регистрация пользователя",
    iconCls: "icon-user",
    autoShow: true,
    modal: true,

    config: {
        userName: "",
        password: "",
        rememberMe: false
    },

    items: {
        xtype: "form",
        reference: "form",
        items: [
            {
                xtype: "textfield",
                reference: "passwordTextField",
                inputType: "password",
                fieldLabel: "Повторите пароль",
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: "onSpecialKey"
                }
            },
            {
                xtype: "checkbox",
                reference: "isAdminCheckBox",
                fieldLabel: "Администратор"
            },
            {
                xtype: "checkbox",
                reference: "isModeratorCheckBox",
                fieldLabel: "Модератор"
            }
        ],
        buttons: [
            {
                text: "Зарегистрироваться",
                formBind: true,
                listeners: {
                    click: "onRegisterClick"
                }
            }
        ]
    },

    listeners: {
        activate: function(win) {
            win.down("textfield[reference=passwordTextField]").focus();
        }
    }
});