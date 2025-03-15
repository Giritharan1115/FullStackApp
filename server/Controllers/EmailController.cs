using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
     [Route("api/email")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            _emailService.SendEmail(request.ToEmail, request.Subject, request.Body);
            return Ok(new { message = "Email sent successfully!" });
        }
    }

    public class EmailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}