using APIPetFeliz.DAO.Usuarios;
using APIPetFeliz.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace APIPetFeliz.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] UsuariosDTO dadosLogin)
        {
            var dao = new UsuariosDAO();
            var usuario = dao.LoginUsuario(dadosLogin);

            if(usuario.Id == 0)
            {
                return NotFound("Usuário e/ou senha inválidos");
            }

            var token = GeneratejwtToken(usuario, "PU8a9W4sv2opkqlOwmgsn3w3Innlc4D5");
            return Ok(new {token});
        }

        private string GeneratejwtToken(UsuariosDTO usuario, string secretKey)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credenciais = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("Cod_Usuario", usuario.Id.ToString()),
                new Claim("Email", usuario.Email.ToString()),
                new Claim("Nome_Usuario", usuario.Nome.ToString()),
                new Claim("Telefone", usuario.Telefone.ToString()),

            };

            var token = new JwtSecurityToken(
                "APIPetFeliz",
                "APIPetFeliz",
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credenciais
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
