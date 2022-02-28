using System.Diagnostics;

namespace ReleaseApp
{
    public class Docker
    {

        public static void Run(string path)
        {
            var process = new Process();
            process.StartInfo.WorkingDirectory = path;
            process.StartInfo.FileName = "docker-compose";
            process.StartInfo.Arguments = "up --build --no-deps";

            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.CreateNoWindow = true;

            process.ErrorDataReceived += (sender, a) => Console.WriteLine(a.Data); ;
            process.OutputDataReceived += (sender, a) => Console.WriteLine(a.Data); ;
            process.EnableRaisingEvents = true;
            process.Start();
            process.BeginOutputReadLine();
            process.BeginErrorReadLine();

            process.StandardInput.WriteLine("exit");

            process.WaitForExit();
        }

    }
}
