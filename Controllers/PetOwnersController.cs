using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using pet_hotel.Models;
using Microsoft.EntityFrameworkCore;

namespace pet_hotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetOwnersController : ControllerBase
    {
        private readonly ApplicationContext _c;
        public PetOwnersController(ApplicationContext c)
        {
            _c = c;
        }

        [HttpGet]
        public List<PetOwner> GetPetOwners()
        {
            return _c.PetOwners.Include(owner => owner.Pets).ToList();
        }

        [HttpGet("{id}")]
        public PetOwner GetPetOwnerById(int id)
        {
            return _c.PetOwners.Include(owner => owner.Pets).FirstOrDefault(owner => owner.Id == id);
        }

        [HttpPost]
        public IActionResult addPetOwner([FromBody] PetOwner owner)
        {
            _c.PetOwners.Add(owner);
            _c.SaveChanges();
            return CreatedAtAction(nameof(GetPetOwnerById), new { id = owner.Id }, owner);
        }

        [HttpDelete("{id}")] 
        public IActionResult DeletePetOwner(int id)
        {
            PetOwner owner = _c.PetOwners.Find(id);
            if (owner is null)
            {
                return NotFound();
            }
            _c.PetOwners.Remove(owner);
            _c.SaveChanges();
            return NoContent();
        }
        
        [HttpPut("{PetOwnerId}")]
        public IActionResult UpdatePetOwner(int PetOwnerId, [FromBody] PetOwner PetOwnerUpdate)
        {
             var owner = _c.PetOwners.Find(PetOwnerId);
             if (owner == null) return NotFound();

            owner.Name = PetOwnerUpdate.Name;
            owner.Email = PetOwnerUpdate.Email;

        
            // _c.Entry(owner).State = EntityState.Modified;
            _c.PetOwners.Update(owner);
            _c.SaveChanges();
            return Ok(owner);
        }

// public IActionResult UpdatePet(int PetId, [FromBody] Pets PetUpdate)
// {
//     var pet = _c.Pets.Include(p => p.PetOwner).SingleOrDefault(p => p.Id == PetId);
//     if (pet == null) return NotFound();

//     // Map the updated fields to the pet entity
//     pet.Name = PetUpdate.Name;
//     pet.PetBreed = PetUpdate.PetBreed;
//     pet.PetColor = PetUpdate.PetColor;
//     pet.PetOwnerid = PetUpdate.PetOwnerid; // Ensure this is the correct property name
//     pet.ImageUrl = PetUpdate.ImageUrl;

//     // The pet is already tracked, so just mark it as modified
//     // _c.Entry(pet).State = EntityState.Modified;
//     _c.Pets.Update(pet);
//     _c.SaveChanges();
//     return Ok(pet);
}


    





















}