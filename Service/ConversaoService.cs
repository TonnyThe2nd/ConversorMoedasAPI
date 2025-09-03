using System.Reflection.Metadata.Ecma335;
using System.Text.Json;
using Api.Models;

namespace Api.Service
{
    public class ConversaoService
    {
        private readonly HttpClient _httpClient;
        private string key;
        public ConversaoService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            key = config["ApiKey:ApiConversao"];
        }

        public async Task<decimal?> ConverteValor(string de, string para, decimal valor)
        {
            var url = $"https://api.exconvert.com/convert?from={de}&to={para}&amount={valor}&access_key={key}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            var data = JsonSerializer.Deserialize<Dados>(json);



            return data?.result.BRL;
        }
    }
}
