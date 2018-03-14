<script type="text/javascript">
  $(function()
  {
    // Handle the user infrmation, saves the Itinerary ino a JSON string
    $(".btn_save_itinerary").click(function()
    {
      // Confirm sending this message
      if (! confirm("Do you want to save this Itinerary?"))
        return false ;

      // JSON empty string
      info = '' ;

      // Loop through all inputs where user can enter or select data, create a json string and
      // save them
      $("[azbd_type]").each(function()
      {
        azbd_type = $(this).attr("azbd_type") ;

        // Put the id of the input as name and value as value. This way when we read it back
        // we can show the value inside of that id

        if (azbd_type == "text")
        {
          id = $(this).attr("id") ;
          value = $.trim($(this).val()) ;
          if (value != "")
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + value + '"'  ;
          }
        }
        else if (azbd_type == "number")
        {
          id = $(this).attr("id") ;
          if ($("#" + id).val().length > 0)
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + $("#" + id).val() + '"'  ;
          }
        }
        if (azbd_type == "date")
        {
          info = addCommaToEndOfNonEmptyString(info) ;

          id = $(this).attr("id") ;
          if ($("#" + id).val().length > 0)
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + $("#" + id).val() + '"'  ;
          }
        }
        if (azbd_type == "time")
        {
          id = $(this).attr("id") ;
          if ($("#" + id).val().length > 0)
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + $("#" + id).val() + '"'  ;
          }
        }
        if (azbd_type == "phone")
        {
          id = $(this).attr("id") ;
          if ($("#" + id).val().length > 0)
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + $("#" + id).val() + '"'  ;
          }
        }
        if (azbd_type == "email")
        {
          id = $(this).attr("id") ;
          if ($("#" + id).val().length > 0)
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + $("#" + id).val() + '"'  ;
          }
        }
        if (azbd_type == "multi_option")
        {
          id = $(this).attr("id") ;
          if ($("#" + id + " span").hasClass("selected"))
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + $("#" + id).find("span.selected").attr("value") + '"'  ;
          }
        }
        if (azbd_type == "yes_no")
        {
          id = $(this).attr("id") ;
          if ($("#" + id + " span").hasClass("selected"))
          {
            info = addCommaToEndOfNonEmptyString(info) ;
            info += "\n" + '  "' + id + '": "' + $("#" + id).find("span.selected").attr("value") + '"'  ;
          }
        }
        if (azbd_type == "multi_line")
        {
          id = $(this).attr("id") ;

          // Add initial empty lines to each multi-line input
          empty_multi_line = true ;
          $("#" + id + " input[type=text]").each(function()
          {
            if ($(this).val().length > 0)
            {
              if (empty_multi_line)
              {
                info = addCommaToEndOfNonEmptyString(info) ;
                info += "\n" + '  "' + id + '": [' + '"' + xmlbEncodeForAJAX($(this).val()) + '"' ;
              }
              else
                info += ',"' + xmlbEncodeForAJAX($(this).val()) + '"' ;
              empty_multi_line = false ;

            }
          }) ;

          // Finish the JSON string for the array from #items_leave_other
          if (!empty_multi_line)
            info += ']' ;

        }

      }) ;

      // Finish the JSON String and run the SQL Update
      if (info.length > 0)
      {
        info = '{' + info + "\n" + '}' ;

        // Save the JSON string in Database---------------------------

      }

    });

  }) ;

  // Adds comma to non-empty string
  function addCommaToEndOfNonEmptyString(info)
  {
    // For a string to pass to JSON add the comma before adding any new parameter
    if (info.length > 0)
      info = info + ',' ;
    return info ;
  } // addCommaToEndOfNonEmptyString

</script>
