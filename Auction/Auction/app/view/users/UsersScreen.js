Ext.define("Auction.view.users.UsersScreen", {
    extend: "Ext.panel.Panel",
    xtype: "usersScreen",
    layout: "fit",

    requires: [
        "Auction.view.users.UsersScreenController"
    ],

    controller: "usersScreen",

    title: "Редактор пользователей",

    items: [
        {
            region: "center",
            xtype: "grid",
            reference: "usersGrid",
            plugins: [
                {
                    ptype: "cellediting",
                    clicksToEdit: 2
                }
            ],
            columns: [
                {
                    header: "Имя пользователя",
                    dataIndex: "Name",
                    minWidth: 200,
                    editor: {
                        xtype: "textfield",
                        allowBlank: false
                    },
                    sortable: false
                },
                {
                    xtype: "checkcolumn",
                    width: 150,
                    header: "Администратор",
                    dataIndex: "IsAdmin",
                    sortable: false
                },
                {
                    xtype: "checkcolumn",
                    width: 150,
                    header: "Модератор",
                    dataIndex: "IsModerator",
                    sortable: false
                },
                {
                    xtype: "actioncolumn",
                    header: "Действия",
                    items: [
                        {
                            tooltip: "Задать пароль",
                            icon: "app/images/key.png",
                            handler: "onSetPasswordClick"
                        },
                        {
                            tooltip: "Удалить",
                            icon: "app/images/delete.png",
                            handler: "onRemoveClick"
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: "toolbar",
                    items: [
                        {
                            iconCls: "icon-add",
                            text: "Добавить",
                            handler: "onAddClick"
                        }
                    ]
                },
                {
                    xtype: "pagingtoolbar",
                    reference: "usersPager",
                    dock: "bottom",
                    displayInfo: true
                }
            ]
        }
    ]
});