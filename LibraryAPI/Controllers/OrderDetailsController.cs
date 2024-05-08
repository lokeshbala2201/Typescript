using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderDetailsController : Controller
    {
        private readonly ApplicationDbcontext _dbContext;
        public OrderDetailsController(ApplicationDbcontext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetOrder()
        {
                return Ok(_dbContext.orderDetails.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderID(int id)
        {
            var order=_dbContext.orderDetails.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();

            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult PostOrderData([FromBody] OrderDetails order)
        {
            _dbContext.orderDetails.Add(order);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostOrderByID(int id,[FromBody] OrderDetails order)
        {
            var orders=_dbContext.orderDetails.FirstOrDefault(m=>m.OrderID==id);
            if(orders==null)
            {
                return NotFound();

            }
            orders.BookID=order.BookID;
            orders.UserID=order.UserID;
            orders.BorrowDate=order.BorrowDate;
            orders.BorrowCount=order.BorrowCount;
            orders.FineAmount=order.FineAmount;
            orders.OrderStatus=order.OrderStatus;
            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order=_dbContext.orderDetails.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();

            }
            _dbContext.orderDetails.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
            
        }
    }
}