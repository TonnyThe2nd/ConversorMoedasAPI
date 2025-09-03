using Microsoft.Extensions.Primitives;

namespace Api.Models
{

    public class Dados
    {
        public string Base { get; set ;}
        public string amount { get; set; }
        public Result result { get; set; }
        public int ms { get; set; }
    }
    public class Result
    {
        public decimal BRL { get; set; }
        public decimal rage { get; set; }
    }
}
