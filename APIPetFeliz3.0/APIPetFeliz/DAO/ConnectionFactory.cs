using MySql.Data.MySqlClient;

namespace APIPetFeliz.DAO
{
    public class ConnectionFactory
    {
        public static MySqlConnection Build()
        {
            return new MySqlConnection("Server=localhost;Database=Bd_Pet_Feliz;Uid=root;Pwd=root;");
        }
    }
}
