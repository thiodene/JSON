// Add initial empty lines to each multi-line input (For Array of strings and numbers)
iter = 1 ;
$("#items_leave_other input[type=text]").each(function()
{
  if ($(this).val().length > 0)
  {
    if (iter == 1)
    {
      result = addCommaToEndOfNonEmptyString(result) ;
      result += "\n" + '  "items_leave_other": [' + '"' + $(this).val() + '"' ;
    }
    else
    {
      result += ',"' + $(this).val() + '"' ;
    }
    iter++ ;

  }
}) ;
// Finish the JSON string for the array from #items_leave_other
if (iter > 1)
  result += ']' ;
