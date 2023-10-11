using APIPetFeliz.DAO.Pets;
using APIPetFeliz.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIPetFeliz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetFelizController : ControllerBase
    {
        [HttpPost]
        [Route("CadastrarPet")]
        public IActionResult CadastrarPet([FromBody]PetsDTO pet)
        {
            var dao = new PetsDAO();
            dao.CadastrarPet(pet);
            return Ok();
        }

        [HttpGet]
        [Route("ListarPet")]
        public IActionResult ListarPet()
        {
            var dao = new PetsDAO();
            var pets = dao.ListarPets();
            return Ok(pets);
        }

        [HttpDelete]
        [Route("apagarPet")]
        public IActionResult DeletarPet(int id)
        {
            var dao = new PetsDAO();
            dao.RemoverPet(id);
            return Ok();
        }
    }
}
