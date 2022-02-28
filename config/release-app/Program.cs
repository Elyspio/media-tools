﻿// See https://aka.ms/new-console-template for more information


using ReleaseApp;

Console.WriteLine("Releasing Elytools");

Console.WriteLine($"appDir    {Internal.AppDir}");
Console.WriteLine($"configDir {Internal.ConfigDir}");
Console.WriteLine($"dockerDir {Internal.DockerDir}");

var oldVersion = Internal.GetRootVersion();

var newVersion = oldVersion.Clone();

newVersion.Minor += 1;

try
{
    Internal.UpdateVersions(newVersion);
    Docker.Run(Internal.DockerDir);
}
catch
{
    Internal.UpdateVersions(oldVersion);
}


var tasks = new List<Task>();

var files = Directory.GetFiles(Internal.ReleasesDir).Select(f => Path.Combine(Internal.ReleasesDir, f)).ToList();

var winInstaller = files.Find(f => f.EndsWith(".exe") && f.Contains(newVersion.Raw));
if (winInstaller != null)
{
    tasks.Add(UpdaterApi.Upload(winInstaller, newVersion, ReleaseApp.Updater.Model.AppArch.Win64));
    tasks.Add(UpdaterApi.Upload(winInstaller, newVersion, ReleaseApp.Updater.Model.AppArch.Win32));
}

var debInstaller = files.Find(f => f.EndsWith(".deb") && f.Contains(newVersion.Raw));
if (debInstaller != null)
{
    tasks.Add(UpdaterApi.Upload(debInstaller, newVersion, ReleaseApp.Updater.Model.AppArch.LinuxDeb));
}

var snapInstaller = files.Find(f => f.EndsWith(".snap") && f.Contains(newVersion.Raw));
if (snapInstaller != null)
{
    tasks.Add(UpdaterApi.Upload(snapInstaller, newVersion, ReleaseApp.Updater.Model.AppArch.LinuxSnap));
}

var rpmInstaller = files.Find(f => f.EndsWith(".rpm") && f.Contains(newVersion.Raw));
if (rpmInstaller != null)
{
    tasks.Add(UpdaterApi.Upload(rpmInstaller, newVersion, ReleaseApp.Updater.Model.AppArch.LinuxRpm));
}


Task.WaitAll(tasks.ToArray());