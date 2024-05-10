using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using GroceryAPI.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserDetailsController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        public UserDetailsController(ApplicationDbContext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.Users.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetUserID(int id)
        {
            var user=_dbContext.Users.FirstOrDefault(m=>m.UserID==id);
            if(user==null)
            {
                return NotFound();

            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostUserID(int id,[FromBody] UserDetails user)
        {
            var users=_dbContext.Users.FirstOrDefault(m=>m.UserID==id);
            if(users==null)
            {
                return NotFound();

            }
          
            users.UserName=user.UserName;
            users.Email=user.Email;
            users.PhoneNumber=user.PhoneNumber;
            users.Address=user.PhoneNumber;
            users.Password=users.Password;
            users.UserProfile=user.UserProfile;
            users.Balance=user.Balance;


            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user=_dbContext.Users.FirstOrDefault(m=>m.UserID==id);
            if(user==null)
            {
                return NotFound();

            }
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
            
        }
    }
}