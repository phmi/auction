using Auction.DataModel.Entities;
using FluentNHibernate.Mapping;

namespace Auction.DataModel.Mappings
{
    internal class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Table("user");
            Id(x => x.Id).Column("id").GeneratedBy.Sequence("user_id_seq");
            Map(x => x.Name).Column("name");
            Map(x => x.Password).Column("password");
            Map(x => x.Salt).Column("salt");
            HasManyToMany(x => x.Roles)
                .Table("user_to_role").ParentKeyColumn("ref_user").ChildKeyColumn("ref_role")
                .Cascade.SaveUpdate()
                .Not.LazyLoad();
            HasMany(x => x.CartItems).KeyColumn("ref_user").Inverse().Cascade.All();
        }
    }
}
