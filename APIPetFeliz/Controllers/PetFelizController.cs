using APIPetFeliz.Azure;
using APIPetFeliz.DAO.Pets;
using APIPetFeliz.DTO;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [Route("CadastrarPet")]
        public IActionResult CadastrarPet([FromBody]PetsDTO pet)
        {
            var azureBlobStorege = new AzureBlobStorage();
            var dao = new PetsDAO();

            var userId = Convert.ToInt32(User.FindFirst("Cod_Usuario").Value);
            pet.Cod_Usuario = userId;

            pet.Foto_Pet = azureBlobStorege.UploadImage(pet.Base64);
            dao.CadastrarPet(pet, userId);

            return Ok();
        }

        [HttpGet]
        [Route("ListarPet")]
        public IActionResult ListarPet(string? porte = null, string? sexo = null, string? uf = null, string? tipo = null, int? Id = null)
        {
            var dao = new PetsDAO();
            var pets = dao.ListarPets(porte, sexo, uf, tipo, Id);
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

        [HttpPut]
        [Route("AtualizarPet")]
        public IActionResult AtualizarPet([FromBody] PetsDTO pet)
        {
            var dao = new PetsDAO();

            try
            {
                dao.AlterarPet(pet);
                return Ok(new { message = "Dados do pet atualizados com sucesso." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Erro ao atualizar dados do pet." });
            }
        }

    }
}
