using Api.Service;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversaoController : ControllerBase
    {
        private readonly ConversaoService _service;

        public ConversaoController(ConversaoService service)
        {
            _service = service;
        }


        [HttpGet("converter")]
        public async Task<IActionResult> converter(string de, string para, decimal valor)
        {
            var resultado = await _service.ConverteValor(de.ToUpper(), para.ToUpper(), valor);

            if (resultado == null) return BadRequest("Erro na conversão");

            return Ok(new {de, para, valor, convertedAmount = resultado});
        }
    }
}
