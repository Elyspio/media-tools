namespace Elytools.Api.Abstractions.Interfaces.Hubs;

public interface IScreenShare
{
	Task FrameUpdate(Frame frame);
}

public record Frame(string Data, int Width, int Height);