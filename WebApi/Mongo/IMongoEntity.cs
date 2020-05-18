namespace WebApi.Mongo
{
    public interface IMongoEntity<TId>
    {
        TId Id { get; set; }
    }
}
