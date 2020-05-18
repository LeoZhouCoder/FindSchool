using System.Collections.Generic;
namespace WebApi.Commands
{
    public class SearchQuery
    {
        public int Position { get; set; }
        public int Limit { get; set; }
        public string Query { get; set; }
        public List<string> Sectors { get; set; }
        public List<string> Types { get; set; }
        public List<string> States { get; set; }
    }
}
