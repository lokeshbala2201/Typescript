using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using GroceryAPI.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
     public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public OrderDetailsController(ApplicationDbContext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetOrder()
        {
            return Ok(_dbContext.order.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderID(int id)
        {
            var order=_dbContext.order.FirstOrDefault(m=>m.OrderID==id);
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
          
            orders.TotalAmount=order.TotalAmount;
            orders.TotalQuantity=order.TotalQuantity;
            orders.UserID=order.UserID;

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