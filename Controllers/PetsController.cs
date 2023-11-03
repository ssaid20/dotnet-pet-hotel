using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pet_hotel.Models;

namespace pet_hotel.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class PetsController : ControllerBase
{
    private readonly ApplicationContext _c;
    public PetsController(ApplicationContext c)
    {
        _c = c;
    }

//Get all pets
    [HttpGet]
    public ActionResult GetPets()
    {
        List<Pets> Pets = _c.Pets.Include(pet => pet.PetOwner).ToList();

        return Ok(Pets);
    }

//get one pets by id
    [HttpGet("{PetId}")]
    public IActionResult GetPetById(int PetId)
    {
        Pets pet = _c.Pets.Include(Pet => Pet.PetOwner).FirstOrDefault(Pet => Pet.Id == PetId);

        if (pet is null)
        {
            return NotFound();
        }
        return Ok(pet);
    }

//Add a pet
    [HttpPost]
    public ActionResult AddPet(Pets Pet)
    {
        PetOwner PetOwner = _c.PetOwners.Find(Pet.PetOwnerid);

        if (PetOwner is null)
        {
            return NotFound();
        }

        _c.Pets.Add(Pet);
        _c.SaveChanges();

        return CreatedAtAction(nameof(GetPetById), new { Id = Pet.Id }, Pet);
    }

//Delete pet
    [HttpDelete("{PetId}")]
    public IActionResult DeletePet(int PetId)
    {
        Pets Pet = _c.Pets.Find(PetId);

        if (Pet is null)
        {
            return NotFound();
        }
        
        _c.Pets.Remove(Pet);
        _c.SaveChanges();

        return NoContent();
    }

// Put to checkin a pet
    [HttpPut("{PetId}/checkin")]
    public IActionResult CheckIn(int PetId)
    {
        Pets Pet = _c.Pets.Find(PetId);

        if (Pet == null)
        {
            return NotFound();
        }
        Pet.PetCheckIn();

        _c.Pets.Update(Pet);
        _c.SaveChanges();

        return Ok(Pet);
    }

    //Put to checkout a pet
     [HttpPut("{PetId}/checkout")]
    public IActionResult CheckOut(int PetId)
    {
        Pets pet = _c.Pets.Find(PetId);
       
        if (pet == null)
        {
            return NotFound();
        }
        pet.PetCheckOut();

        _c.Pets.Update(pet);
        _c.SaveChanges();

        return Ok(pet);
    }

    // [HttpPut("{PetId}")]
    // public IActionResult UpdatePet(int PetId, [FromBody] Pets Pet)
    
    
    // {
    //     if (!_c.Pets.Any(p => p.Id == PetId)) return NotFound();
    // //      if (Pet.Id != PetId)
    // // {
    // //     // The ID in the path doesn't match the ID in the body
    // //     return BadRequest("The ID in the URL does not match the ID of the pet.");
    // // }

    //     _c.Update(Pet);
    //     _c.SaveChanges();
    //     return Ok(_c.Pets.Include(p => p.PetOwner).SingleOrDefault(p => p.Id == PetId));
    // }
[HttpPut("{PetId}")]
public IActionResult UpdatePet(int PetId, [FromBody] Pets PetUpdate)
{
    var pet = _c.Pets.Include(p => p.PetOwner).SingleOrDefault(p => p.Id == PetId);
    if (pet == null) return NotFound();

    // Map the updated fields to the pet entity
    pet.Name = PetUpdate.Name;
    pet.PetBreed = PetUpdate.PetBreed;
    pet.PetColor = PetUpdate.PetColor;
    pet.PetOwnerid = PetUpdate.PetOwnerid; // Ensure this is the correct property name
    pet.ImageUrl = PetUpdate.ImageUrl;

    // The pet is already tracked, so just mark it as modified
    // _c.Entry(pet).State = EntityState.Modified;
    _c.Pets.Update(pet);
    _c.SaveChanges();
    return Ok(pet);
}

    
}