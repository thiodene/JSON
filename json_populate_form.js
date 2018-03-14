<script type="text/javascript">
  var itin_json    = '%itin_json%' ;
  var itin_obj = JSON.parse(itin_json) ;

  console.log(itin_obj) ; // debug alert

  // Parse the JSON and go through all the page options
  $("[azbd_type]").each(function()
  {
    azbd_type = $(this).attr("azbd_type") ;

    // Go Through all the Input and options in the page and populate where applicable
    // With respect to the type of the option

    if (azbd_type == "text" || azbd_type == "number" || azbd_type == "email")
    {
      id = $(this).attr("id") ;
      if(itin_obj.hasOwnProperty(id))
        $(this).val(itin_obj[id]) ;
    }
    if (azbd_type == "date")
    {
      id = $(this).attr("id") ;
      if(itin_obj.hasOwnProperty(id))
        document.getElementById(id).value = itin_obj[id] ;
    }

    if (azbd_type == "time")
    {
      id = $(this).attr("id") ;
      if(itin_obj.hasOwnProperty(id))
        document.getElementById(id).value = itin_obj[id] ;
    }

    if (azbd_type == "phone")
    {
      id = $(this).attr("id") ;
      if(itin_obj.hasOwnProperty(id))
        document.getElementById(id).value = itin_obj[id] ;
    }

    if (azbd_type == "multi_option")
    {
      id = $(this).attr("id") ;
      if(itin_obj.hasOwnProperty(id))
      {
        $("#" + id + " span").each(function()
        {
          if ($(this).attr('value') == itin_obj[id])
          {
            $(this).addClass("selected");
            $('<i class="fas fa-check"><i>').prependTo($(this)) ;
          }
        }) ;
      }
    }

    if (azbd_type == "yes_no")
    {
      id = $(this).attr("id") ;
      if(itin_obj.hasOwnProperty(id))
      {
        $("#" + id + " span").each(function()
        {
          if ($(this).attr('value') == itin_obj[id])
          {
            $(this).addClass("selected");
            $('<i class="fas fa-check"><i>').prependTo($(this)) ;
          }
        }) ;
      }
    }

    if (azbd_type == "multi_line")
    {
      id = $(this).attr("id") ;
      if(itin_obj.hasOwnProperty(id))
      {

        //for (var i = 0, len = itin_obj[id].length; i < len; i++) 
        //{
          ////document.getElementById(id).value =  itin_obj[id][i] ;
          //$("#" + id + " input[type=text]").val(itin_obj[id][i]) ;
          ////alert(itin_obj[id][i]) ;
        //}

        var line = 0 ;
        $("#" + id + " input[type=text]").each(function()
        {
          $(this).val(itin_obj[id][line]) ;
          line++ ;
        }) ;
        alert(line) ;
      }
    }

  }) ;



</script>
