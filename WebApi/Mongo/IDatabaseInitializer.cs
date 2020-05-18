using System.Threading.Tasks;

namespace WebApi.Mongo
{
    public interface IDatabaseInitializer
    {
        void Initialize();
    }
}
