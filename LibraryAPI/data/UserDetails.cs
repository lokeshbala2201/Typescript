using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace LibraryAPI.data;
[Table("userDetails",Schema ="public")]
public class UserDetails
{
    [Key]
    public int UserID { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int Balance { get; set; }
}