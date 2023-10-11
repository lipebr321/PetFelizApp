using APIPetFeliz.DAO;
using APIPetFeliz.DAO.Usuarios;
using APIPetFeliz.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace APIPetFeliz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        [HttpPost]
        [Route("cadastrarUsuario")]
        public IActionResult CadastrarUsuario([FromBody] UsuariosDTO usuario)
        {
            var dao = new UsuariosDAO();
            dao.CadastrarUsuario(usuario);
            return Ok();
        }

        [HttpGet]
        [Route("listarUsuario")]
        public IActionResult Listar()
        {

            var dao = new UsuariosDAO();
            var usuarios = dao.Listar();
            return Ok(usuarios);
        }

        [HttpGet]
        [Route("Recuperar")]
        public IActionResult Recuperar(string email)
        {
            var dao = new UsuariosDAO();
            dao.RecuperarSenha(email);
            return Ok();
        }

        [HttpPut]
        [Route("atualizarUsuario")]
        public IActionResult Atualizar([FromBody] UsuariosDTO usuario)
        {
            var dao = new UsuariosDAO();
            dao.AlterarUsuario(usuario);
            return Ok();
        }

        [HttpDelete]
        [Route("apagarUsuario")]
        public IActionResult Deletar(int Id)
        {
            var dao = new UsuariosDAO();
            dao.RemoverUsuario(Id);
            return Ok();
        }

    }

}
