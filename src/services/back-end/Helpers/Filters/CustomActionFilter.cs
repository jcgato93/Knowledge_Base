using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Helpers.Filters
{
    public class CustomActionFilter : IActionFilter
    {
        private readonly ILogger<CustomActionFilter> logger;

        public CustomActionFilter(ILogger<CustomActionFilter> logger)
        {
            this.logger = logger;
        }
     
        // Execute After action
        public void OnActionExecuting(ActionExecutingContext context)
        {
            logger.LogTrace(context.ToString(),"trace actions");
        }

        // Execute Before action
        public void OnActionExecuted(ActionExecutedContext context)
        {
            logger.LogTrace(context.ToString(), "trace actions");
        }
    }
}
