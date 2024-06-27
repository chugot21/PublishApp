using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Interfaces;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Service;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly SymmetricSecurityKey _key;
    
    public TokenService(IConfiguration config) //permet de recuperer les infos de appsettings.json
    {
        _config = config;
        //cree une cle symetrique qui est encodee en tableau de bytes en utilisant lemcodage UTF8
        //a partir de la cle stockee dans la config.
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
    }
    
    public string CreateToken(User user)
    {
        //Les claims ou revendications sont des assertions sur un user,
        //cad des paires cle-valeur qui ne sont pas stockees dans la DB.
        //Creation de claims pour un user
        var claims = new List<Claim>
        {
            //new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.GivenName, user.UserName)
        };

        //quel type d'encryption on veut.
        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        //on cree un objet de representation du token.
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            //Identity est comme un portefeuille pour le token
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds,
            Issuer = _config["JWT:Issuer"],
            Audience = _config["JWT:Audience"]
        };
        //cree le token
        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}