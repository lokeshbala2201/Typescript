using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAPI.data;
[Table("orderDetails",Schema ="public")]
public class OrderDetails
{
    [Key]
    public int OrderID { get; set; }
    public int BookID { get; set; }
    public int UserID { get; set; }
    public DateTime BorrowDate { get; set; }
    public int BorrowCount { get; set; }
    public int FineAmount { get; set; }
    public string OrderStatus { get; set; }
}