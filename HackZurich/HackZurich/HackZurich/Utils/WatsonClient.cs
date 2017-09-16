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
        private static async Task<Dictionary<string,string>> getWatsonAnswerWithIntent(string input)
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

            var Intents = answer?.intents;
            string firstIntent = "";

            foreach (string line in Intents.ToString().Split('\n'))
            {
                if (line.Contains("intent"))
                {
                    string[] splittedLine = line.Split('\"');
                    if (splittedLine.Length > 4)
                    {
                        firstIntent = splittedLine[3];
                        break;
                    }
                }
            }

            Dictionary<string, string> res = new Dictionary<string, string>();
            res.Add(output, firstIntent);
            return res;
        }

        public static async Task<string> getWatsonAnswerBasedOnInent(string query)
        {
            Dictionary<string, string> watsonAnswer = await getWatsonAnswerWithIntent(query);

            string watsonRes = "";
            string watsonintent = "";
            foreach (var keyValPair in watsonAnswer)
            {
                watsonRes = keyValPair.Key;
                watsonintent = keyValPair.Value;
            }

            string resultBasedOnIntent = "";
            switch(watsonintent)
            {
                case "Goodmorning":
                    resultBasedOnIntent = watsonRes;
                    break;
                default: break;
                    
            }
            
            return resultBasedOnIntent;
        }

    }
}