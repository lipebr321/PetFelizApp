using Microsoft.AspNetCore.Mvc;


namespace APIPetFeliz.Controllers
{
    using APIPetFeliz.DAO;
    using APIPetFeliz.DTO;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using MySql.Data.MySqlClient;
    using System.Data;

    namespace SuaApi.Controllers
    {
        [Route("api/Login")]
        [ApiController]
        public class LoginController : ControllerBase
        {
            private readonly IConfiguration _configuration;

            public LoginController(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            [HttpPost]
            public IActionResult VerificarCredenciai( [FromBody] LoginDTO credenciais)
            {
                var conexao = ConnectionFactory.Build();
                conexao.Open();

                if (credenciais == null)
                {
                    return BadRequest("Credenciais não fornecidas.");
                }


                string query = "SELECT COUNT(*) FROM tb_usuario WHERE email = @Email AND senha = @Senha";
                MySqlCommand cmd = new MySqlCommand(query, conexao);

                cmd.Parameters.AddWithValue("@Email", credenciais.Email);
                cmd.Parameters.AddWithValue("@Senha", credenciais.Senha);

                int count = Convert.ToInt32(cmd.ExecuteScalar());

                if (count > 0)
                {
                    return Ok("Credenciais corretas. O usuário está autenticado.");
                }
                else
                {
                    conexao.Close();
                    return Unauthorized("Credenciais incorretas. O usuário não está autenticado.");
                }
            }
        }
    }
}


