using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
namespace MetroAPI.data
{
    [Table("orderdetails",Schema ="public")]
    public class OrderDetails
    {
        [Key]
        public  int OrderID{ get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int  Members{ get; set; }
        public int Price { get; set; }
    }
}