using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GroceryAPI.data
{
    [Table("OrderDetails",Schema ="public")]     
    public class OrderDetails
    {
        [Key]
        public int OrderID { get; set; }
        public int ItemID { get; set; }
        public int UserID { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int TotalQuantity { get; set; }
        public int TotalAmount { get; set; }

    }
}