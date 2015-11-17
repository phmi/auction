using System;
using System.Configuration;
using System.Data.Common;

namespace Auction.DataModel.Utils
{
    public class AppHarborPgHelper
    {
        public static bool IsAppHarbor()
        {
            var uriString = ConfigurationManager.AppSettings["ELEPHANTSQL_URL"];
            return !string.IsNullOrEmpty(uriString);
        }

        public static string GetConnStr()
        {
            var uriString = ConfigurationManager.AppSettings["ELEPHANTSQL_URL"];
            if (string.IsNullOrEmpty(uriString))
                return null;
            var uri = new Uri(uriString);
            var db = uri.AbsolutePath.Trim('/');
            var user = uri.UserInfo.Split(':')[0];
            var passwd = uri.UserInfo.Split(':')[1];
            var port = uri.Port > 0 ? uri.Port : 5432;
            var connStr = string.Format("Server={0};Database={1};User Id={2};Password={3};Port={4}",
                uri.Host, db, user, passwd, port);
            return connStr;
        }

        public static DbConnection GetConnection()
        {
            var ahConnStr = GetConnStr();
            if (ahConnStr == null)
                return null;
            var factory = DbProviderFactories.GetFactory("Npgsql");
            var connection = factory.CreateConnection();
            if (connection == null)
                throw new Exception("Could not create connection from factory Npgsql");
            connection.ConnectionString = ahConnStr;
            return connection;
        }
    }
}
