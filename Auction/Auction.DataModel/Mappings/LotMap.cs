using Auction.DataModel.Entities;
using FluentNHibernate.Mapping;

namespace Auction.DataModel.Mappings
{
    internal class LotMap : ClassMap<Lot>
    {
        public LotMap()
        {
            Table("lot");
            Id(x => x.Id).Column("id").GeneratedBy.Sequence("lot_id_seq");
            Map(x => x.Name).Column("name");
            Map(x => x.Description).Column("description");
            Map(x => x.DateTime).Column("datetime");
            Map(x => x.Hidden).Column("hidden");
            Map(x => x.Price).Column("price");
            References(x => x.User).Column("ref_user");
            HasMany(x => x.CartItems).KeyColumn("ref_lot").Inverse().Cascade.All().Not.LazyLoad();
        }
    }
}
