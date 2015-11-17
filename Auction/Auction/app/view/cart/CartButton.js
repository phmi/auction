Ext.define("Auction.view.cart.CartButton", {
    extend: "Ext.Button",
    xtype: "cartButton",

    requires: [
        "Auction.view.cart.CartButtonController"
    ],

    tooltip: "Корзина",
    controller: "cartButton",

    iconCls: "icon-cart",
    hidden: true
});