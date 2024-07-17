using api.Models;

namespace api.Interfaces;

public interface INotificationHub
{
    public Task SendMessage(Notification notification);
}