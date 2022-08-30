using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System.Text.Json;

using System.Reflection;

namespace WhiteBoard.Commands;

public static class CommandFactory
{
  public static Command ParseCommand(string type, string json)
  {
#pragma warning disable CS8600,CS8602,CS8603,CS8604
    type = type.Replace("Command", "");
    var T = Assembly.GetExecutingAssembly().GetType($"WhiteBoard.Commands.{type}");
    if (null == T) { throw new Exception("Command class is not found in assembly."); }

    Console.WriteLine($"{type}Command is found, parsing parameters");
    //Console.WriteLine(json);
    var cmd = (Command)JsonSerializer.Deserialize(json, T);
    return cmd;
#pragma warning restore CS8600,CS8602,CS8603,CS8604
  }
}
