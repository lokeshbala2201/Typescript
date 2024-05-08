using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MetroAPI.data;
namespace MetroAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonDetailsControllers : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public PersonDetailsControllers(ApplicationDbContext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetPerson()
        {
                return Ok(_dbContext.person.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetPersonID(int id)
        {
            var person=_dbContext.person.FirstOrDefault(m=>m.ID==id);
            if(person==null)
            {
                return NotFound();

            }
            return Ok(person);
        }

        [HttpPost]
        public IActionResult PostPersonData([FromBody] PersonDetails person)
        {
            _dbContext.person.Add(person);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostPersonByID(int id,[FromBody] PersonDetails person)
        {
            var personData=_dbContext.person.FirstOrDefault(m=>m.ID==id);
            if(personData==null)
            {
                return NotFound();

            }
            personData.UserName=person.UserName;
            personData.Email=person.Email;
            personData.Password=person.Password;
            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeletePerson(int id)
        {
            var person=_dbContext.person.FirstOrDefault(m=>m.ID==id);
            if(person==null)
            {
                return NotFound();

            }
            _dbContext.person.Remove(person);
            _dbContext.SaveChanges();
            return Ok();
            
        }
    }
}