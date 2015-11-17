using System.Configuration;
using Auction.DataModel.Utils;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Ninject.Activation;

namespace Auction.DataModel.Ninject
{
    internal class SessionFactoryProvider : Provider<ISessionFactory>
    {
        private readonly ISessionFactory _sessionFactory;

        public SessionFactoryProvider()
        {
            var connectionString = AppHarborPgHelper.GetConnStr() ?? ConfigurationManager.AppSettings["ConnectionString"];
            var configuration = Fluently.Configure()
                .Database(PostgreSQLConfiguration.Standard.ConnectionString(connectionString))
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<SessionFactoryProvider>());
            SchemaMetadataUpdater.QuoteTableAndColumns(configuration.BuildConfiguration());
            _sessionFactory = configuration
                .BuildSessionFactory();
        }

        protected override ISessionFactory CreateInstance(IContext context)
        {
            return _sessionFactory;
        }
    }
}
