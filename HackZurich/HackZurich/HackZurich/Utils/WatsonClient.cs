using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Flurl;
using Flurl.Http;
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;

namespace HackZurich.Utils
{
    public static class WatsonClient
    {
        public static async Task<string> getWatsonAnswer(string input)
        {
            var baseurl = "https://gateway.watsonplatform.net/conversation/api";
            var workspace = "acceffd4-cce1-486f-ab0c-42455d31b86d";
            var username = "4ac2790d-0711-442e-8962-9a2ea15ba76e";
            var password = "H1b1JZybELYj";
            var context = null as object;
            var message = new { input = new { text = input }, context };

            var resp = await baseurl
                .AppendPathSegments("v1", "workspaces", workspace, "message")
                .SetQueryParam("version", "2017-05-26")
                .WithBasicAuth(username, password)
                .AllowAnyHttpStatus()
                .PostJsonAsync(message);

            var json = await resp.Content.ReadAsStringAsync();

            var answer = new
            {
                intents = default(object),
                entities = default(object),
                input = default(object),
                output = new
                {
                    text = default(string[])
                },
                context = default(object)
            };

            answer = JsonConvert.DeserializeAnonymousType(json, answer);

            var output = answer?.output?.text?.Aggregate(
                new StringBuilder(),
                (sb, l) => sb.AppendLine(l),
                sb => sb.ToString());

            /*
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"{resp.StatusCode}: {output}");

            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine(json);
            Console.ResetColor();
            */

            return $"{output}";
        }
    }
}