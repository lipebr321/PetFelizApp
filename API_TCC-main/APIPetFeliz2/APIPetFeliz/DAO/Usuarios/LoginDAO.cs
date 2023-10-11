using MySql.Data.MySqlClient;

namespace APIPetFeliz.DAO.Usuarios
{
    public class LoginDAO
    {

        private readonly string connectionString;

        public LoginDAO(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public bool VerificarCredenciais(string email, string senha)
        {
            using (var conexao = ConnectionFactory.Build())
            {
                conexao.Open();

                string query = "SELECT COUNT(*) FROM Tb_Usuario WHERE email = @Email AND senha = @Senha";
                MySqlCommand cmd = new MySqlCommand(query, conexao);

                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Senha", senha);

                int count = Convert.ToInt32(cmd.ExecuteScalar());

                conexao.Close();

                return count > 0;
            }
        }

    }
}


