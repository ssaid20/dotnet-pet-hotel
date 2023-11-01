using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace pet_hotel.Models
{ 

public enum BreedType
{
    Shepard,
    Poodle,
    Beagle,
    Bulldog,
    Terrier,
    Boxer,
    Labrador,
    Retriever
}

public enum ColorType
{
    White,
    Black,
    Golden,
    Tricolor,
    Spotted, 
    Brown
}
public class Pets
{
    
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public BreedType BreedType { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public ColorType ColorType { get; set; }

    [Required]
    public PetOwner PetOwner { get; set; }
    [Required]
    public int OwnedById { get; set; }



    public DateTime? CheckInDate { get; set; }
    
    public bool CheckedIn { get; set; }
    public void PewhitCheckIn()
    {
        CheckedIn = true;
       //maybe? CheckedIn = DateTime.Now
       Console.WriteLine($"{Name} has been checked IN.");
        
    }

    public void PetCheckOut()
    {
        CheckedIn = false;
        //maybe? checkedIn = null;
        Console.WriteLine($"{Name} has been checked OUT.");
    }
}
}