using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Auction.Security
{
    public class PasswordEncryptor : IPasswordEncryptor
    {
        public string Encrypt(string password, string salt)
        {
            var encoding = Encoding.UTF8;
            var pwdBytes = encoding.GetBytes(password);
            var saltBytes = new List<byte>();
            for (var i = 0; i < salt.Length; i += 2)
            {
                saltBytes.Add(byte.Parse(salt.Substring(i, 2), NumberStyles.AllowHexSpecifier));
            }
            var cripto = SHA512.Create();
            var bytesForHash = pwdBytes.Concat(saltBytes).ToArray();
            var hashBytes = cripto.ComputeHash(bytesForHash);
            for (var i = 0; i < 10000; i++)
            {
                var bytes = hashBytes.Concat(pwdBytes).Concat(saltBytes).ToArray();
                hashBytes = cripto.ComputeHash(bytes);
            }
            return string.Concat(hashBytes.Select(b => b.ToString("X2")));
        }

        public string GenerateSalt()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var buffer = new byte[64];
                rng.GetBytes(buffer);
                var salt = string.Concat(buffer.Select(b => b.ToString("X2")));
                return salt;
            }
        }
    }
}