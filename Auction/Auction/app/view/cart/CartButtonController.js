Ext.define("Auction.view.cart.CartButtonController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.cartButton",

    init: function () {
        var self = this;
        Ext.GlobalEvents.on("currentUserChanged", self.onCurrentUserChanged, self);
        Ext.GlobalEvents.on("cartChanged", self.onCartChanged, self);
    },
    
    onCurrentUserChanged: function (user) {
        var self = this;
        if (user) {
            self.getView().show();
            self.loadCartCount();
        } else {
            self.getView().setText("");
            self.getView().hide();
        }
    },
    
    onCartChanged: function() {
        var self = this;
        self.loadCartCount();
    },
    
    loadCartCount: function() {
        var self = this;
        Ext.Ajax.request({
            url: "Cart/Count",
            success: function (response) {
                var result = Ext.util.JSON.decode(response.responseText);
                self.getView().setText("" + result.Count > 0 ? result.Count : "");
            }
        });
    }
});