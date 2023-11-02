using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

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

    public string ImageUrl { get; set; }    

    [Required]
    public string ImageUrl { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PetBreed PetBreed { get; set; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public PetColor PetColor { get; set; }

    [ForeignKey("PetOwners")]
        public int PetOwnerid { get; set; }
        
        public PetOwner PetOwner { get; set; }


    public Pets()
    {
        CheckedInAt = DateTime.MinValue;
    }

    public DateTime? CheckedInAt { get; set; }
    
    public void PetCheckIn()
    {

        CheckedInAt = DateTime.UtcNow;

       Console.WriteLine($"{Name} has been checked IN.");
    }

    public void PetCheckOut()
    {

         CheckedInAt = DateTime.MinValue;
       
     
        Console.WriteLine($"{Name} has been checked OUT.");
    }
}
}