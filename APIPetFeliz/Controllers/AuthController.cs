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

            var cidadeId = usuario.Cidade != null ? usuario.Cidade.Cod_Cidade : 0;
            var cidadeNome = usuario.Cidade != null ? usuario.Cidade.Nome_Cidade : string.Empty;
            var estadoId = usuario.Estado != null ? usuario.Estado.Cod_Estado : 0;
            var estadoNome = usuario.Estado != null ? usuario.Estado.Nome_Estado : string.Empty;
            var logradouroId = usuario.Logradouro != null ? usuario.Logradouro.Id : 0;
            var logradouroNome = usuario.Logradouro != null ? usuario.Logradouro.NomeLog : string.Empty;
            var logradouroCEP = usuario.Logradouro != null ? usuario.Logradouro.CEP: string.Empty;
            var logradouroNum = usuario.Logradouro != null ? usuario.Logradouro.Numero : string.Empty;
            var petId = usuario.Pet != null ? usuario.Pet.Id_Pet : 0;

            var claims = new List<Claim>
            {
                new Claim("Cod_Usuario", usuario.Id.ToString()),
                new Claim("Email", usuario.Email.ToString()),
                new Claim("Nome_Usuario", usuario.Nome.ToString()),
                new Claim("Telefone", usuario.Telefone.ToString()),
                new Claim("Cod_Log", logradouroId.ToString()),
                new Claim("Nome_Log", logradouroNome),
                new Claim("Numero_Log", logradouroNum),
                new Claim("Cod_Cidade", cidadeId.ToString()),
                new Claim("Nome_Cidade", cidadeNome),
                new Claim("Cod_Estado", estadoId.ToString()),
                new Claim("Nome_Estado", estadoNome),
                new Claim("CEP", logradouroCEP),
                new Claim("Cod_Pet", petId.ToString()),
                


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
