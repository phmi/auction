using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Auction.Security
{
    public class PasswordEncriptor : IPasswordEncriptor
    {
        public string Encript(string password)
        {
            var encoding = Encoding.UTF8;
            var pwdBytes = encoding.GetBytes(password);
            var cripto = SHA512.Create();
            var hashBytes = cripto.ComputeHash(pwdBytes);
            return string.Concat(hashBytes.Select(b => b.ToString("X2")));
        }
    }
}