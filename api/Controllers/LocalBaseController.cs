using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WhiteBoard.Controllers;

public abstract class LocalBaseController : Controller
{

  public override void OnActionExecuted(ActionExecutedContext context)
  {
    base.OnActionExecuted(context);
  }

}
