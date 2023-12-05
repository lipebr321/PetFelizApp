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
        public IActionResult Listar()
        {

            var dao = new UsuariosDAO();
            var usuarios = dao.Listar();
            return Ok(usuarios);
        }

        [HttpGet]
    [Route("{id}")]
        public IActionResult ListarPorID([FromRoute]int id)
        {
            var dao = new UsuariosDAO();
            var usuario = dao.ListarPorId(id);

            return Ok(usuario);
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
        public IActionResult AtualizarUsuario([FromBody] UsuariosDTO usuario)
        {
            var dao = new UsuariosDAO();

            try
            {
                dao.AtualizarUsuario(usuario);
                return Ok(new { message = "Dados do usuário atualizados com sucesso." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Erro ao atualizar dados do usuário." });
            }
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
