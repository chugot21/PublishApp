using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace api.Service;

public class ImportAppointmentsNotificationHub : Hub<INotificationHub>
{
    public Task SubscribeToUser(string userId)
    {
        // var notification = new Notification()
        // {
        //     UserId = Context.ConnectionId,
        //     Message = "Un utilisateur vient de publier un nouveau post. Actualiser pour le voir."
        // };
        // await Clients.All.SendMessage(notification);
        return this.Groups.AddToGroupAsync(Context.ConnectionId, userId);
    }
}