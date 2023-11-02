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
        
        [HttpPut("{PetId}")]
        public IActionResult UpdatePetOwnerById(int PetId, [FromBody] PetOwner PetOwner)
        {
            if(!_c.PetOwners.Any(p => p.Id == PetId)) return NotFound();
            _c.Update(PetOwner);
            _c.SaveChanges();
            return Ok(_c.PetOwners.Include(p => p.Pets).SingleOrDefault(p => p.Id == PetId));
        }

       
        

    }





















}