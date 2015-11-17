using Auction.DataModel.Entities;
using FluentNHibernate.Mapping;

namespace Auction.DataModel.Mappings
{
    internal class CartItemMap : ClassMap<CartItem>
    {
        public CartItemMap()
        {
            Table("cart_item");
            Id(x => x.Id).Column("id").GeneratedBy.Sequence("cart_item_id_seq");
            References(x => x.User).Column("ref_user");
            References(x => x.Lot).Column("ref_lot").Not.LazyLoad();
            Map(x => x.DateTime).Column("datetime");
        }
    }
}
