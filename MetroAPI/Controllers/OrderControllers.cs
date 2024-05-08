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
    [ApiController]
    [Route("api/[controller]")]
     public class OrderDetailsControllers : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public OrderDetailsControllers(ApplicationDbContext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.order.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetTravelID(int id)
        {
            var order=_dbContext.travelData.FirstOrDefault(m=>m.ID==id);
            if(order==null)
            {
                return NotFound();

            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult Postorder([FromBody] OrderDetails orderdata)
        {
            _dbContext.order.Add(orderdata);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostOrderID(int id,[FromBody] OrderDetails order)
        {
            var orders=_dbContext.order.FirstOrDefault(m=>m.OrderID==id);
            if(orders==null)
            {
                return NotFound();

            }
            orders.From=order.From;
            orders.To=order.To;
            orders.Price=order.Price;
            orders.Members=order.Members;
            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order=_dbContext.order.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();

            }
            _dbContext.order.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
            
        }
        

    }
    
    
}