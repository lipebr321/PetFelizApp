using APIPetFeliz.DAO.Usuarios;
using APIPetFeliz.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] UsuariosDTO usuario)
        {
            try
            {
                var user = new UsuariosDAO();
                UsuariosDTO usuarioLogado = user.LoginUsuario(usuario);

                if (usuarioLogado != null && !string.IsNullOrEmpty(usuarioLogado.Nome))
                {
                    return Ok(new {message = "Login bem-sucedido" + usuario.Nome});
                }
                else
                {
                    return Unauthorized(new {message = "Usuário ou senha incorretos"});
                }
            }
            catch (Exception)
            {

                return StatusCode(500, new {message = "Erro no servidor"});
            }
        }

        [HttpGet]
        [Route("listarUsuario")]
        public IActionResult Listar(int id)
        {
            var dao = new UsuariosDAO();
            var usuario = dao.ListarPorId(id);

            if (usuario != null)
            {
                return Ok(usuario);
            }
            else
            {
                return NotFound();
            }
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
