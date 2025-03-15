using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpGet("myAttendance")]
        public async Task<ActionResult<IEnumerable<RSVP>>> GetUserAttendance()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

            if (!int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized("Invalid user ID.");
            }

            return await _context.RSVPs.Where(r => r.UserId == userId).ToListAsync();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<RSVP>>> GetAllRSVPs()
        {
            return await _context.RSVPs.ToListAsync();
        }
    }
}
