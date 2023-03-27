using Elytools.Api.Abstractions.Helpers;
using Elytools.Api.Abstractions.Interfaces.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Channels;

namespace Elytools.Api.Sockets.Hubs;

public class ScreenShare : Hub<IScreenShare>
{
	public async Task UploadFrame(ChannelReader<Frame> stream)
	{
		while (await stream.WaitToReadAsync())
		while (stream.TryRead(out var frame))
		{
			Console.WriteLine($"new frame {Log.F(frame.Height)} {Log.F(frame.Width)} length={frame.Data.Length / 1024}KB");
			_ = Clients.Others.FrameUpdate(frame);
		}
	}
}