Ext.define("Auction.view.login.LoginWindow", {
    extend: "Ext.window.Window",
    xtype: "loginWindow",

    requires: [
        "Auction.view.login.LoginWindowController"
    ],

    controller: "loginWindow",

    title: "Вход пользователя",
    iconCls: "icon-key",
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
                xtype: "checkbox",
                reference: "rememberMeCheckBox",
                fieldLabel: "Запомнить"
            }
        ],
        buttons: [
            {
                text: "Зарегистрироваться",
                formBind: true,
                listeners: {
                    click: "onRegisterClick"
                }
            }, {
                text: "Войти",
                formBind: true,
                listeners: {
                    click: "onLoginClick"
                }
            }
        ]
    },
    
    listeners: {
        activate: function (win) {
            win.down("textfield[reference=userNameTextField]").focus();
        }
    }
});