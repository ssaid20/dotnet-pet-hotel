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

    [HttpGet]
    public ActionResult GetPets()
    {
        List<Pets> Pets = _c.Pets.Include(pet => pet.PetOwner).ToList();

        return Ok(Pets);
    }

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

    [HttpPut("pet/{PetId}")]
    public IActionResult CheckIn(int PetId)
    {
        Pets Pet = _c.Pets.Find(PetId);

        if (Pet is null)
        {
            return NotFound();
        }
        Pet.PetCheckIn();

        _c.Pets.Update(Pet);
        _c.SaveChanges();

        return NoContent();
    }
     [HttpPut("pet/{PetId}")]
    public IActionResult CheckOut(int PetId)
    {
        Pets Pet = _c.Pets.Find(PetId);

        if (Pet is null)
        {
            return NotFound();
        }
        Pet.PetCheckOut();

        _c.Pets.Update(Pet);
        _c.SaveChanges();

        return NoContent();
    }
}