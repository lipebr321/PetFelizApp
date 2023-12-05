namespace APIPetFeliz.DTO
{
    public class UsuariosDTO
    {
        public int Id { get; set; }
        public string? CPF { get; set; }
        public string? Nome { get; set;}
        public string? Email { get; set;}
        public string? Telefone { get; set;}
        public string Senha { get; set;}
        public LogradouroDTO? Logradouro { get; set;}
        public CidadeDTO? Cidade { get; set;}
        public EstadoDTO? Estado { get; set;}
        public PetsDTO? Pet { get; set;}


    }
}
