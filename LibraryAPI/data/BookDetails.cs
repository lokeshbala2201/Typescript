using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryAPI.data;
[Table("bookDetails",Schema ="public")]
public class BookDetails
{
    [Key]
    public int BookID { get; set; }
    public string BookName { get; set; }
    public string BookAuthor { get; set; }
    public int Count { get; set; }
}