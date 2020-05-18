using System.Collections.Generic;
namespace WebApi.Models
{
    public class Option
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public List<string> Options { get; set; }
    }
}
