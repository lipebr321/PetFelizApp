using APIPetFeliz.DTO;
using Dapper;
using MySql.Data.MySqlClient;
using System.Data;

namespace APIPetFeliz.DAO.Usuarios
{
    public class UsuariosDAO
    {
        #region Login Usuario
        public UsuariosDTO LoginUsuario(UsuariosDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = "select * from Tb_Usuario where Email = @Email_Usuario and Senha = @Senha_usuario";

                var comando = new MySqlCommand(query, conexao);
                comando.Parameters.AddWithValue("@Email_Usuario", usuario.Email);
                comando.Parameters.AddWithValue("@Senha_usuario", usuario.Senha);

                MySqlDataAdapter ad = new MySqlDataAdapter(comando);

                DataTable dt = new DataTable();
                ad.Fill(dt);

                foreach (DataRow linha in dt.Rows)
                {
                    usuario.Id = Convert.ToInt32(linha["Cod_Usuario"]);
                    usuario.CPF = linha["CPF"].ToString();
                    usuario.Nome = linha["Nome_Usuario"].ToString();
                    usuario.Email = linha["Email"].ToString();
                    usuario.Telefone = linha["Telefone"].ToString();
                    usuario.Senha = linha["Senha_usuario"].ToString();
                }
                return usuario;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion

        #region Cadastrar Usuario

        public void CadastrarUsuario(UsuariosDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                var sqlEndereco = "INSERT INTO Tb_Logradouro VALUES (DEFAULT, @cep, @nomeLog, @numero);";

                var idEndereco = conexao.ExecuteScalar<int>(sqlEndereco, new
                {
                    cep = usuario.Logradouro.CEP,
                    nomeLog = usuario.Logradouro.NomeLog,
                    numero = usuario.Logradouro.Numero
                });

                var sqlUsuario = "insert into Tb_Usuario (Cod_Usuario, CPF, Nome_Usuario, Email, Telefone, senha, Cod_Log) values (DEFAULT, @CPF, @nome, @email, @telefone, @senha, last_insert_id());";

                conexao.Execute(sqlUsuario, new
                {
                    CPF = usuario.CPF,
                    nome = usuario.Nome,
                    email = usuario.Email,
                    telefone = usuario.Telefone,
                    senha = usuario.Senha
                });

                conexao.Close();
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion

        #region Listar Usuario

        public IEnumerable<UsuariosDTO> Listar()
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"
                    SELECT * FROM Tb_Usuario u
                    INNER JOIN tb_logradouro l ON u.cod_log = l.cod_log";

                /* var usuarioDictionary = new Dictionary<int, UsuariosDTO>();

                 var usuarios = conexao.Query<UsuariosDTO, LogradouroDTO, UsuariosDTO>(
                     query,
                     (usuario, logradouro) =>
                     {
                         if (!usuarioDictionary.TryGetValue(usuario.Id, out UsuariosDTO usuarioEntry))
                         {
                             usuarioEntry = usuario;
                             usuarioEntry.Logradouro = logradouro;
                             usuarioDictionary.Add(usuario.Id, usuarioEntry);
                         }
                         return usuarioEntry;
                     },
                     splitOn: "cod_log"
                 ).AsList();*/

                var comando = new MySqlCommand(query, conexao);
                var dataReader = comando.ExecuteReader();

                var usuarios = new List<UsuariosDTO>();

                while (dataReader.Read())
                {
                    var usuario = new UsuariosDTO();
                    usuario.Id = int.Parse(dataReader["Cod_Usuario"].ToString());
                    usuario.Nome = dataReader["Nome_Usuario"].ToString();
                    usuario.CPF = dataReader["CPF"].ToString();
                    usuario.Email = dataReader["Email"].ToString();
                    usuario.Telefone = dataReader["Telefone"].ToString();
                    usuario.Senha = dataReader["Senha"].ToString();

                    usuario.Logradouro = new LogradouroDTO();
                    usuario.Logradouro.CEP = dataReader["CEP"].ToString();
                    usuario.Logradouro.NomeLog = dataReader["Nome_Log"].ToString();
                    usuario.Logradouro.Numero = dataReader["Numero_Log"].ToString();

                    usuarios.Add(usuario);
                }

                return usuarios;

            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion

        #region Alterar Usuario
        public void AlterarUsuario(UsuariosDTO usuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {

                var sqlEndereco = @"update Tb_Logradouro set CEP = @cep, Nome_Log = @nomeLog, Numero_Log = @numero where Cod_Log = @Id;";

                var idEndereco = conexao.ExecuteScalar<int>(sqlEndereco, new
                {
                    Id = usuario.Logradouro.Id,
                    cep = usuario.Logradouro.CEP,
                    nomeLog = usuario.Logradouro.NomeLog,
                    numero = usuario.Logradouro.Numero
                });

                var sqlUsuario = "update Tb_Usuario set Nome_Usuario = @nome, Email = @email, Telefone = @telefone, senha = @senha where Cod_Usuario = @Id;";

                conexao.Execute(sqlUsuario, new
                {
                    Id = usuario.Id,
                    nome = usuario.Nome,
                    email = usuario.Email,
                    telefone = usuario.Telefone,
                    senha = usuario.Senha
                });

            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion

        #region Apagar Usuario
        public void RemoverUsuario(int idUsuario)
        {
            var conexao = ConnectionFactory.Build();
            conexao.Open();

            using (MySqlCommand cmd = new MySqlCommand())
                try
                {

                    cmd.Connection = conexao;

                    cmd.CommandText = "SELECT Cod_Log FROM Tb_Usuario WHERE Cod_Usuario = @IdUsuario";
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    int codLog = (int)cmd.ExecuteScalar();

                    cmd.Parameters.Clear();
                    cmd.CommandText = "UPDATE Tb_Usuario SET Cod_Log = NULL WHERE Cod_Usuario = @IdUsuario";
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    int linhasAfetadasChaveEstrangeira = cmd.ExecuteNonQuery();

                    cmd.Parameters.Clear();
                    cmd.CommandText = "DELETE FROM Tb_Usuario WHERE Cod_Usuario = @IdUsuario";
                    cmd.Parameters.AddWithValue("@IdUsuario", idUsuario);
                    int linhasAfetadasUsuario = cmd.ExecuteNonQuery();

                    cmd.Parameters.Clear();
                    cmd.CommandText = "DELETE FROM Tb_Logradouro WHERE Cod_Log = @CodLog";
                    cmd.Parameters.AddWithValue("@CodLog", codLog);
                    int linhasAfetadasLogradouro = cmd.ExecuteNonQuery();
                }
                catch (Exception)
                {

                    throw;
                }
                finally
                {
                    conexao.Close();
                }


        }
        #endregion

        #region Recuperar Senha
        public string RecuperarSenha(string email)
        {
            string senha = null;

            var conexao = ConnectionFactory.Build();
            conexao.Open();

            try
            {
                string query = @"select Senha from Tb_Usuario where Email = @email";

                using (MySqlCommand comando = new MySqlCommand(query, conexao))
                {
                    //var comando = new MySqlCommand(query, conexao);
                    comando.Parameters.AddWithValue("@email", email);

                    using (MySqlDataReader reader = comando.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            senha = reader["Senha"].ToString();
                        }
                    }
                }
                return senha;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conexao.Close();
            }
        }
        #endregion
    }

}

