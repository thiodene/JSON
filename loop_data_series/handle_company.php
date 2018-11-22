// Build the User's company info for Editing
function buildCompanyInfoDiv($company)
{
  // Connect to db
  $dbc = db_connect_sims() ;
  $dbc_local = db_connect_local() ;
  
  $query2 = "SELECT settings.id AS setting_id, settings_json
        FROM settings
        WHERE user_id = " . $_SESSION['id'] ;
  $result2 = mysqli_query($dbc_local, $query2) or trigger_error("Query: $query2\n<br>MySQL Error: " . mysqli_error($dbc_local));
  $row2 = mysqli_fetch_array($result2, MYSQLI_NUM) ;
  if (@mysqli_num_rows($result2) != 0) 
  {
    $settings_json = $row2[1] ;
    $settings_obj = json_decode($settings_json) ;

    // Get just the AQI data
    if (isset($settings_obj->company))
      $company_obj = $settings_obj->company ;
    else
      $company_obj = false ;
  }
  else
    $company_obj = false ;
  
  $final_company_info = '' ;
  
  if ($company_obj)
  {
    // Make the Company's info editable
    $final_company_info = '<div class="company">'
    . '<dl>'
    . '<dt>Company Name:</dt><dd><input id="company_name" class="text_field" name="company_name" value="' . $company_obj->company_name . '" type="text"></dd>'
    . '<dt>City:</dt><dd><input id="city" class="text_field" name="city" value="' . $company_obj->city . '" type="text"></dd>'
    . '<dt>Timezone:</dt><dd>' . buildTimezoneSelectInput($company_obj->timezones[0],$company_obj->timezones[1]) . '</dd>'
    . '<dt>Alarm Email:</dt><dd><input id="alarm_email" class="text_field" name="alarm_email" value="' . $company_obj->alarm_email . '" type="text"></dd>'
    . '<dt>Address:</dt><dd><textarea id="address" row="3" cols="30">' . $company_obj->address . '</textarea></dd>'
    . '</dl>'
    . '</div>' ;
  }
  else
  {
    // Get the User's Company info from SIMS1
    $query = "SELECT company.id AS company_id, company.name AS company_name, 
              city, timezone, address, alarm_email
          FROM company
          WHERE company.id = " . $company ; // Can also be done
    $result = mysqli_query($dbc, $query) or trigger_error("Query: $query\n<br>MySQL Error: " . mysqli_error($dbc));
    $row = mysqli_fetch_array($result, MYSQLI_NUM) ;
    $company_id = $row[0];
    $company_name = $row[1];
    $city = $row[2];
    $timezone = buildTimezoneSelectInput($row[3]);
    $address = $row[4];
    $alarm_email = $row[5];
    
    
    $final_company_info = '<div class="company">'
    . '<dl>'
    . '<dt>Company Name:</dt><dd><input id="company_name" class="text_field" name="company_name" value="' . $company_name . '" type="text"></dd>'
    . '<dt>City:</dt><dd><input id="city" class="text_field" name="city" value="' . $city . '" type="text"></dd>'
    . '<dt>Timezone:</dt><dd>' . $timezone . '</dd>'
    . '<dt>Alarm Email:</dt><dd><input id="alarm_email" class="text_field" name="alarm_email" value="' . $alarm_email . '" type="text"></dd>'
    . '<dt>Address:</dt><dd><textarea id="address" row="3" cols="30">' . $address . '</textarea></dd>'
    . '</dl>'
    . '</div>' ;
  }
  
  // Close db
  db_close($dbc_local) ;
  db_close($dbc) ;
  
  return $final_company_info ;
  
} // buildCompanyInfoDiv
