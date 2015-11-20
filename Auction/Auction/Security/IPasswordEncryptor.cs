namespace Auction.Security
{
    public interface IPasswordEncryptor
    {
        string Encrypt(string password, string salt);

        string GenerateSalt();
    }
}