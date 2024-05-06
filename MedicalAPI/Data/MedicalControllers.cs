using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MedicalAPI
{
    [Route("[controller]")]
    public class MedicalControllers : Controller
    {
       
    
        private static List<User> _User = new List<User>
        {
            // Add more Contacts here if needed
            new User {Username = "Ravi", Email = "wYUeh@example.com", Password= "1234567890" },
           
        };

        // GET: api/Contacts
        [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(User);
        }

        // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetMedicine(string id)
        {
            var medicine = _User.Find(m => m.Email ==id);
            if (medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostMedicine([FromBody] User medicine)
        {
            _User.Add(medicine);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(string id, [FromBody] User medicine)
        {
            var index = _User.FindIndex(m => m.Email == id);
            if (index < 0)
            {
                return NotFound();
            }
            _User[index] = medicine;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            var medicine = _User.Find(m => m.Email == id);
            if (medicine == null)
            {
                return NotFound();
            }
            _User.Remove(medicine);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
    [Route("[controller]")]
    public class MedicalControllers : Controller
    {
       
    
        private static List<Medicine> _medicine = new List<Medicine>
        {
            // Add more Contacts here if needed
            new Medicine {id=1, MedicineName="Anacin",quantity=5,price=2};
           
        };

        // GET: api/Contacts
        [HttpGet]
        public IActionResult GetContacts()
        {
            return Ok(Medicine);
        }

        // GET: api/Contacts/1
        [HttpGet("{id}")]
        public IActionResult GetMedicine(string id)
        {
            var medicine = _medicine.Find(m =>m.id==id);
            if (medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        //Adding a new medicine
        // POST: api/Contacts
        [HttpPost]
        public IActionResult PostMedicine([FromBody] User medicine)
        {
            _User.Add(medicine);
            // You might want to return CreatedAtAction or another appropriate response
            return Ok();
        }

        // Updating an existing medicine
        // PUT: api/Contacts/1
        [HttpPut("{id}")]
        public IActionResult PutMedicine(string id, [FromBody] User medicine)
        {
            var index = _User.FindIndex(m => m.Email == id);
            if (index < 0)
            {
                return NotFound();
            }
            _User[index] = medicine;
            // You might want to return NoContent or another appropriate response
            return Ok();
        }

        // Deleting an existing medicine
        // DELETE: api/Contacts/1
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            var medicine = _User.Find(m => m.Email == id);
            if (medicine == null)
            {
                return NotFound();
            }
            _User.Remove(medicine);
            // You might want to return NoContent or another appropriate response
            return Ok();
        }
    }
}