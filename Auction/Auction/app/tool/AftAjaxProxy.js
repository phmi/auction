Ext.define("Auction.tool.AftAjaxProxy", {
    extend: "Ext.data.proxy.Ajax",
    requires: ["Ext.data.proxy.Ajax"],
    alias: "proxy.aftajax",
    constructor: function (config) {
        var defaults = { timeout: 10000 };
        this.callParent([Ext.Object.merge(defaults, config)]);
    },
    buildRequest: function (operation) {
        var r = this.callParent([operation]);
        var afth = { "--RequestVerificationToken": window.__RequestVerificationToken };
        var p = r.getProxy();
        if (p) {
            var h = Ext.Object.merge(p.getHeaders() || {}, afth);
            p.setHeaders(h);
        }
        return r;
    },
    listeners: {
        exception: function (proxy, response) {
            if (response.status === 200) {
                var result = Ext.util.JSON.decode(response.responseText);
                Ext.Msg.show({
                    title: "Ошибка",
                    message: result.Error,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            } else {
                Ext.MessageBox.show({
                    title: "Ошибка " + response.status + ": " + response.statusText,
                    msg: response.responseText,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});