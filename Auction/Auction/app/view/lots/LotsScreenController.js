Ext.define("Auction.view.lots.LotsScreenController", {
    extend: "Auction.tool.ViewController",
    alias: "controller.lotsScreen",

    requires: [
        "Auction.store.LotStore",
        "Auction.view.lots.HiddenGridColumn"
    ],

    init: function () {
        var self = this;
        self.store = Ext.create("Auction.store.LotStore");
        self.store.on("beforeload", self.onBeforeStoreLoad, self);
        self.store.on("load", self.onStoreLoad, self);
        self.lookupReference("lotsPager").bindStore(self.store);
        self.lookupReference("lotsGrid").reconfigure(self.store);

        self.hiddenGridColumn = null;

        var currentUserStr = sessionStorage.getItem("currentUser");
        if (currentUserStr && Ext.JSON.decode(currentUserStr).IsModerator) {
            self.showModeratorStuff();
        } else {
            self.hideModeratorStuff();
        }

        Ext.GlobalEvents.on("currentUserChanged", self.onCurrentUserChanged, self);
    },

    hideModeratorStuff: function () {
        var self = this;
        if (self.hiddenGridColumn) {
            var grid = self.lookupReference("lotsGrid");
            grid.headerCt.remove(self.hiddenGridColumn);
            grid.getView().refresh();
            self.hiddenGridColumn = null;
        }
        self.lookupReference("hideLotButton").hide();
        self.lookupReference("showLotButton").hide();
    },
    
    showModeratorStuff: function () {
        var self = this;
        if (!self.hiddenGridColumn) {
            var grid = self.lookupReference("lotsGrid");
            self.hiddenGridColumn = Ext.create("Auction.view.lots.HiddenGridColumn");
            grid.headerCt.insert(grid.columns.length + 1, self.hiddenGridColumn);
            grid.getView().refresh();
        }
        self.lookupReference("hideLotButton").show();
        self.lookupReference("showLotButton").show();
    },

    onCurrentUserChanged: function (user) {
        var self = this;
        if (user && user.IsModerator) {
            self.showModeratorStuff();
        } else {
            self.hideModeratorStuff();
        }
        self.store.load();
    },
    
    onBeforeStoreLoad: function(store, operation) {
        var self = this;
        var params = {
            searchStr: self.lookupReference("searchTextField").value
        }
        params = Ext.Object.merge(operation.getParams() || {}, params);
        operation.setParams(params);
    },

    onStoreLoad: function () {
        var self = this;
        self.onGridSelectionChange();
    },

    onSearchTextFieldSpecialKey: function(field, e) {
        var self = this;
        if (e.getKey() === e.ENTER) {
            self.store.load();
        }
    },
    
    onGridSelectionChange: function () {
        var self = this;
        var selections = self.lookupReference("lotsGrid").getSelectionModel().getSelection();
        if (selections.length === 0) {
            self.lookupReference("hideLotButton").disable();
            self.lookupReference("showLotButton").disable();
            self.lookupReference("toCartButton").disable();
        } else {
            if (selections[0].data.Hidden) {
                self.lookupReference("hideLotButton").disable();
                self.lookupReference("showLotButton").enable();
            } else {
                self.lookupReference("hideLotButton").enable();
                self.lookupReference("showLotButton").disable();
            }
            self.lookupReference("toCartButton").enable();
        }
    },

    onHideLotButtonClick: function() {
        var self = this;
        self.getView().disable();
        self.requestAjax({
            url: "Lots/HideLot",
            params: {
                id: self.lookupReference("lotsGrid").getSelectionModel().getSelection()[0].id
            },
            success: function () {
                self.getView().enable();
                self.store.load();
            },
            failure: function () {
                self.getView().enable();
            }
        });
    },
    
    onShowLotButtonClick: function() {
        var self = this;
        self.getView().disable();
        self.requestAjax({
            url: "Lots/ShowLot",
            params: {
                id: self.lookupReference("lotsGrid").getSelectionModel().getSelection()[0].id
            },
            success: function () {
                self.getView().enable();
                self.store.load();
            },
            failure: function () {
                self.getView().enable();
            }
        });
    },
    
    onToCartButtonClick: function () {
        var self = this;
        if (!sessionStorage.getItem("currentUser")) {
            Ext.Msg.alert("Необходимо войти", "Необходимо войти пользователю");
            return;
        }
        self.getView().disable();
        self.requestAjax({
            url: "Lots/AddToCart",
            params: {
                id: self.lookupReference("lotsGrid").getSelectionModel().getSelection()[0].id
            },
            success: function () {
                self.getView().enable();
                self.store.load();
                Ext.GlobalEvents.fireEvent("cartChanged");
            },
            failure: function () {
                self.getView().enable();
            }
        });
    }
});