using System;
using System.Collections.Generic;

namespace Auction.DataModel.Entities
{
    public class Lot
    {
        public virtual long Id { get; set; }

        public virtual string Name { get; set; }

        public virtual string Description { get; set; }

        public virtual DateTime DateTime { get; set; }

        public virtual bool Hidden { get; set; }

        public virtual decimal Price { get; set; }

        public virtual User User { get; set; }

        private List<CartItem> _cartItems;

        public virtual IList<CartItem> CartItems
        {
            get { return _cartItems ?? (_cartItems = new List<CartItem>()); }
        }
    }
}
