using MySql.Data.MySqlClient;

namespace APIPetFeliz.DAO
{
    public class ConnectionFactory
    {
        public static MySqlConnection Build()
        {
            return new MySqlConnection("Server=petfeliz.mysql.database.azure.com;Database=Bd_Pet_Feliz;Uid=petfeliz;Pwd=Teste@00;");
        }
    }
}
