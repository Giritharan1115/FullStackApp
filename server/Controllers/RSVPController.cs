using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/rsvps")]
    [ApiController]
    public class RSVPController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RSVPController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RSVP>>> GetRSVPs()
        {
            return await _context.RSVPs.Include(r => r.Event).Include(r => r.User).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<RSVP>> CreateRSVP(RSVP rsvp)
        {
            _context.RSVPs.Add(rsvp);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRSVPs), new { id = rsvp.Id }, rsvp);
        }
    }
}
