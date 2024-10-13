using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/event")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IEventCategoryService _categoryService;

        public EventController(IEventService eventService, IEventCategoryService categoryService)
        {
            _eventService = eventService;
            _categoryService = categoryService;
        }


    }
}
