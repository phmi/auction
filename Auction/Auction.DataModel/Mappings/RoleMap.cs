using Auction.DataModel.Entities;
using FluentNHibernate.Mapping;

namespace Auction.DataModel.Mappings
{
    internal class RoleMap : ClassMap<Role>
    {
        public RoleMap()
        {
            Table("role");
            Id(x => x.Id).Column("id").GeneratedBy.Sequence("role_id_seq");
            Map(x => x.Name).Column("name");
        }
    }
}
