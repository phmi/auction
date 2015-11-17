using System;

namespace Auction.DataModel.Entities
{
    public class CartItem
    {
        public virtual long Id { get; set; }

        public virtual DateTime DateTime { get; set; }

        public virtual User User { get; set; }

        public virtual Lot Lot { get; set; }
    }
}
