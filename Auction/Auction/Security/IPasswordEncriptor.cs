namespace Auction.Security
{
    public interface IPasswordEncriptor
    {
        string Encript(string password);
    }
}