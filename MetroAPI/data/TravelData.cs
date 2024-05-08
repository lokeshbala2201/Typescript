using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace MetroAPI.data
{
    [Table("traveldata", Schema ="public")]
    public class TravelData
    {
        [Key]
        public int ID { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int Price { get; set; }
    }
}