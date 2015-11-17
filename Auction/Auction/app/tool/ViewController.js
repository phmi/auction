Ext.define("Auction.tool.ViewController", {
    extend: "Ext.app.ViewController",
    
    requestAjax: function (parameters) {
        Ext.Ajax.request({
            url: parameters.url,
            params: Ext.Object.merge(parameters.params || {}, { __RequestVerificationToken: window.__RequestVerificationToken }),
            method: parameters.method ? parameters.method : "POST",
            success: function (response) {
                var result = Ext.util.JSON.decode(response.responseText);
                if (result.Error) {
                    Ext.Msg.show({
                        title: "Ошибка",
                        message: result.Error,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                    if (typeof parameters.failure === "function") {
                        parameters.failure(response);
                    }
                } else if (typeof parameters.success === "function") {
                    parameters.success(result);
                }
            },
            failure: function (xhr) {
                Ext.Msg.show({
                    title: "Ошибка " + xhr.status + ": " + xhr.statusText,
                    message: xhr.responseText,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                if (typeof parameters.failure === "function") {
                    parameters.failure(xhr);
                }
            }
        });
    }
});