using System;
using Auction.DataModel.Entities;

namespace Auction.Models
{
    public class CartItemModel
    {
        public static CartItemModel FromCartItem(CartItem cartItem)
        {
            var lotModel = new CartItemModel
            {
                Id = cartItem.Id,
                Name = cartItem.Lot.Name,
                Description = cartItem.Lot.Description,
                DateTime = cartItem.DateTime,
                Price = cartItem.Lot.Price,
                User = cartItem.Lot.User.Name
            };
            return lotModel;
        }

        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DateTime { get; set; }

        public decimal Price { get; set; }

        public string User { get; set; }
    }
}