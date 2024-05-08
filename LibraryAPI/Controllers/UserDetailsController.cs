using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using LibraryAPI.data;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDbcontext _dbContext;
        public UserDetailsController(ApplicationDbcontext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_dbContext.userDatails.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetUserID(int id)
        {
            var user=_dbContext.userDatails.FirstOrDefault(m=>m.UserID==id);
            if(user==null)
            {
                return NotFound();

            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            _dbContext.userDatails.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostUserID(int id,[FromBody] UserDetails user)
        {
            var users=_dbContext.userDatails.FirstOrDefault(m=>m.UserID==id);
            if(users==null)
            {
                return NotFound();

            }
            users.UserID=user.UserID;
            users.UserName=user.UserName;
            users.Email=user.Email;
            users.Password=user.Password;
            users.Balance=user.Balance;
            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user=_dbContext.userDatails.FirstOrDefault(m=>m.UserID==id);
            if(user==null)
            {
                return NotFound();

            }
            _dbContext.userDatails.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
            
        }

    }
}