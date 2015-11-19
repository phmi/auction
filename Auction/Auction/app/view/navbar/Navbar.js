Ext.define("Auction.view.navbar.Navbar", {
    extend: "Ext.toolbar.Toolbar",
    xtype: "navbar",

    requires: [
        "Auction.view.navbar.NavbarController",
        "Auction.view.cart.CartButton"
    ],

    controller: "navbar",

    items: [
        {
            text: "Лоты",
            listeners: {
                click: "onLotsClick"
            }
        },
        {
            reference: "myLotsButton",
            text: "Мои лоты",
            listeners: {
                click: "onMyLotsClick"
            }
        },
        {
            reference: "usersButton",
            iconCls: "icon-users",
            text: "Пользователи",
            listeners: {
                click: "onUsersClick"
            }
        },
        "-",
        {
            iconCls: "icon-help",
            text: "О программе",
            listeners: {
                click: "onAboutClick"
            }
        },
        "->",
        {
            reference: "loginButton",
            iconCls: "icon-key",
            text: "Войти",
            listeners: {
                click: "onLoginClick"
            }
        },
        {
            reference: "userButton",
            iconCls: "icon-user",
            text: "Пользователь",
            menu: {
                xtype: "menu",
                items: [
                    {
                        text: "Выйти",
                        listeners: {
                            click: "onLogoutClick"
                        }
                    }
                ]
            }
        },
        {
            xtype: "cartButton",
            listeners: {
                click: "onCartClick"
            }
        }
    ]
});