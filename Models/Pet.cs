using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace pet_hotel.Models
{ 

public enum PetBreed
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

public enum PetColor
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
    public PetBreed PetBreed { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PetColor PetColor { get; set; }

    [ForeignKey("PetOwners")]
        public int PetOwnerid { get; set; }
        
        public PetOwner PetOwner { get; set; }



    public DateTime? CheckInDate { get; set; }
    
    public bool CheckedIn { get; set; }
    public void PetCheckIn()
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