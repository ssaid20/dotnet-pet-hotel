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

        

    }





















}