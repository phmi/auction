Ext.Loader.setConfig({ enabled: true });
Ext.application({
    name: "Auction",
    appFolder: "app",
    views: ["navbar.Navbar"],
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
    },
    defaultToken: "lots"
});