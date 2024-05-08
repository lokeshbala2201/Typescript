using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using MetroAPI.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MetroAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelDataControllers : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public TravelDataControllers(ApplicationDbContext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetTravalData()
        {
                return Ok(_dbContext.travelData.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetTravelID(int id)
        {
            var travel=_dbContext.travelData.FirstOrDefault(m=>m.ID==id);
            if(travel==null)
            {
                return NotFound();

            }
            return Ok(travel);
        }

        [HttpPost]
        public IActionResult PostTravelData([FromBody] TravelData travel)
        {
            _dbContext.travelData.Add(travel);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostTravelByID(int id,[FromBody] TravelData travel)
        {
            var travelData=_dbContext.travelData.FirstOrDefault(m=>m.ID==id);
            if(travelData==null)
            {
                return NotFound();

            }
            travelData.From=travel.From;
            travelData.To=travel.To;
            travelData.Price=travel.Price;
            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTravelData(int id)
        {
            var travel=_dbContext.travelData.FirstOrDefault(m=>m.ID==id);
            if(travel==null)
            {
                return NotFound();

            }
            _dbContext.travelData.Remove(travel);
            _dbContext.SaveChanges();
            return Ok();
            
        }
        

    }
}