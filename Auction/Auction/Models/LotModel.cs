using System;
using Auction.DataModel.Entities;

namespace Auction.Models
{
    public class LotModel
    {
        public static LotModel FromLot(Lot lot)
        {
            var lotModel = new LotModel
            {
                Id = lot.Id,
                Name = lot.Name,
                Description = lot.Description,
                DateTime = lot.DateTime,
                Hidden = lot.Hidden,
                Price = lot.Price,
                User = lot.User.Name
            };
            return lotModel;
        }

        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime DateTime { get; set; }

        public bool Hidden { get; set; }

        public decimal Price { get; set; }

        public string User { get; set; }
    }
}