using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GroceryAPI.data;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemDetailsController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        public ItemDetailsController(ApplicationDbContext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetItem()
        {
           return Ok( _dbContext.ItemData.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetItemByID(int id)
        {
            var index=_dbContext.ItemData.FirstOrDefault(m=>m.ItemID==id);
            if(index==null)
            {
                return NotFound();
            }
            return Ok(index);
        }
        
        [HttpPost]
        public IActionResult PostItem([FromBody] ItemDetails itemData)
        {
            _dbContext.ItemData.Add(itemData);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostItemID(int id,[FromBody] ItemDetails item)
        {
            var items=_dbContext.ItemData.FirstOrDefault(m=>m.ItemID==id);
            if(items==null)
            {
                return NotFound();

            }
            items.ItemName=item.ItemName;
            items.Quantity=item.Quantity;
            items.Price=item.Price;
            items.PurchaseDate=item.PurchaseDate;
            items.ExpiryDate=item.PurchaseDate;
            items.ItemImage=item.ItemImage;
            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            var item=_dbContext.ItemData.FirstOrDefault(m=>m.ItemID==id);
            if(item==null)
            {
                return NotFound();

            }
            _dbContext.ItemData.Remove(item);
            _dbContext.SaveChanges();
            return Ok();
            
        }
    }
}