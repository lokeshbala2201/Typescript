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
    public class BookDetailsController : Controller
    {
        private readonly ApplicationDbcontext _dbContext;
        public BookDetailsController(ApplicationDbcontext applicationDbContext)
        {
            _dbContext=applicationDbContext;
        }

        [HttpGet]
        public IActionResult GetBook()
        {
                return Ok(_dbContext.bookdetails.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetBookID(int id)
        {
            var book=_dbContext.bookdetails.FirstOrDefault(m=>m.BookID==id);
            if(book==null)
            {
                return NotFound();

            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult PostBookData([FromBody] BookDetails book)
        {
            _dbContext.bookdetails.Add(book);
            _dbContext.SaveChanges();
            return Ok();
        }


        [HttpPut("{id}")]
        public IActionResult PostBookByID(int id,[FromBody] BookDetails book)
        {
            var books=_dbContext.bookdetails.FirstOrDefault(m=>m.BookID==id);
            if(books==null)
            {
                return NotFound();

            }
           books.BookName=book.BookName;
           books.BookAuthor=book.BookAuthor;
           books.Count=book.Count;
            _dbContext.SaveChanges();
            return Ok();


        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book=_dbContext.bookdetails.FirstOrDefault(m=>m.BookID==id);
            if(book==null)
            {
                return NotFound();

            }
            _dbContext.bookdetails.Remove(book);
            _dbContext.SaveChanges();
            return Ok();
            
        }
 
    }
}