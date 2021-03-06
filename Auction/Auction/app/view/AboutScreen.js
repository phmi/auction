﻿Ext.define("Auction.view.AboutScreen", {
    extend: "Ext.panel.Panel",
    xtype: "aboutScreen",
    layout: "fit",

    title: "О программе",

    items: [
        {
            html: "<h2>Задание для самостоятельного выполнения</h2>" +
                "<h3>Название</h3>" +
                "<p>Разработка Интернет-аукциона</p>" +
                "<h3>Технологии</h3>" +
                "<ol>" +
                "<li>БД: PostgreSQL</li>" +
                "<li>Платформа разработки: MS .NET</li>" +
                "<li>Шаблон проектирования: MVC</li>" +
                "<li>Доступ к данным: NHibernate</li>" +
                "<li>Графический интерфейс: ExtJS</li>" +
                "</ol>" +
                "<h3>Исходный код</h3>" +
                "<a href='https://github.com/phmi/auction'>https://github.com/phmi/auction</a>" +
                "<h3></h3>" +
                "<address>E-mail: phmi.mail@gmail.com</address>" +
                "<p>© 2015 Rustam Sekerbayev</p>",
            xtype: "panel"
        }
    ]
});