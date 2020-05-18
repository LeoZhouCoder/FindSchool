using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using WebApi.Mongo;

namespace WebApi.Models
{
    public class School : IMongoCommon
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Suburb { get; set; }
        public string State { get; set; }
        public int PostCode { get; set; }
        public string Sector { get; set; }
        public string Type { get; set; }
        public string CampusType { get; set; }
        public string Website { get; set; }
        public bool IsDeleted { get; set; }
    }
}
