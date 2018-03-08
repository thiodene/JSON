//Add initial empty lines to each multi-line input
iter = 1 ;
$("#items_leave_other input[type=text]").each(function()
{
  if ($(this).val().length > 0)
  {
    result = addCommaToEndOfNonEmptyString(result) ;
    result += "\n" + '  "items_leave_other' + iter + '": ' + '"' + $(this).val() + '"' ;
    iter++ ;
  }
}) ;
