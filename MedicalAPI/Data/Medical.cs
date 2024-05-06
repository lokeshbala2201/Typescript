namespace MedicalAPI;

public class User
{
   
    public string Username{ get; set; }
    public string Email{ get; set; }
    public string Password{ get; set; }
}
public class Medicine
{
    public string ID { get; set; }
    public string MedicineName { get; set; }
    public int quantity { get; set; }
    public int price { get; set; }
}