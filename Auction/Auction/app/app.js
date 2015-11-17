Ext.Loader.setConfig({ enabled: true });
Ext.application({
    name: "Auction",
    appFolder: "app",
    views: ["navbar.Navbar", "lots.LotsScreen"],
    launch: function () {
        var self = this;

        window.__RequestVerificationToken = Ext.select("input[name='__RequestVerificationToken']").elements[0].value;

        var currentScreen = null;
        var viewport = Ext.create("Ext.container.Viewport", {
            renderTo: Ext.getBody(),
            layout: {
                type: "border"
            },
            items: [
                {
                    xtype: "navbar",
                    region: "north",
                    listeners: {
                        screenSelected: function(screen) {
                            self.showScreen(screen);
                        }
                    }
                }
            ]
        });
        self.showScreen = function(screen) {
            if (currentScreen != null) {
                viewport.remove(currentScreen, true);
            }
            Ext.apply(screen, {
                region: "center"
            });
            viewport.add(screen);
            currentScreen = screen;
        };

        var lotsScreen = Ext.create("Auction.view.lots.LotsScreen");
        self.showScreen(lotsScreen);
    }
});