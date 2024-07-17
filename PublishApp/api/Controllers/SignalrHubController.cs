using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace api.Controllers;

public class SignalrHubController : ControllerBase
{
    private readonly IHubContext<ImportAppointmentsNotificationHub, INotificationHub> _importAppointmentsNotification;

    public SignalrHubController(IHubContext<ImportAppointmentsNotificationHub, INotificationHub> hubContext)
    {
        _importAppointmentsNotification = hubContext;
    }
        
    public async Task<ActionResult> ImportAppointmentsNotification(Notification notification)
    {
        try
        {
            await _importAppointmentsNotification.Clients.Group(notification.UserId).SendMessage(notification);
            return Ok(true);
        }
        catch (Exception ex)
        {
            return Ok(false);
        }
    }
}