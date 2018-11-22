// Build the Concentration to AQI table for each unique GAS (per chemical formula) / all equipments combined
function buildSensorAQITable($company)
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
    $aqi_obj = $settings_obj->aqi ;
  }
  else
    $aqi_obj = false ;
    
  
  $final_aqi_table = '' ;
  $aqi_array = array() ;
  
  $aqi_table_header = '<div class="panel">
  <table id="aqi"><thead><tr>
  <th colspan="2">AQI</th>
  <th colspan="2" style="background:#00e400;">Good</th>
  <th colspan="2" style="background:#ff0;">Moderate</th>
  <th colspan="2" style="background:#ff7e00;">Sensitive</th>
  <th colspan="2" style="background:#f00; color: #fff;">Unhealthy</th>
  <th colspan="2" style="background:#99004c; color: #fff;">Very Unhealthy</th>
  <th colspan="2"style="background:#7e0023; color: #fff;">Hazardous</th><th></th></tr>
  <tr>
  <th>Sensor</th><th>Average</th>
  <th style="background:#00e400;">0</th>
  <th style="background:#00e400;">50</th>
  <th style="background:#ff0;">51</th>
  <th style="background:#ff0;">100</th>
  <th style="background:#ff7e00;">101</th>
  <th style="background:#ff7e00;">150</th>
  <th style="background:#f00; color: #fff;">151</th>
  <th style="background:#f00; color: #fff;">200</th>
  <th style="background:#99004c; color: #fff;">201</th>
  <th style="background:#99004c; color: #fff;">300</th>
  <th style="background:#7e0023; color: #fff;">301</th>
  <th style="background:#7e0023; color: #fff;">500</th>
  <th>Unit</th></tr></thead>
  <tbody>' ;
  
  $aqi_table_footer = '  <tr><td colspan="15">&nbsp;</td></tr>
  </tbody>
  </table>
</div>' ;
  

  // If no saved data just display the default input fields
  $aqi_table_content = '<td><select class="time_average">
  <option value="1">1 Hour</option>
  <option value="8">8 Hours</option>
  <option value="24" selected>24 Hours</option></select></td>
  <td>0</td>
  <td><input type="number" step="0.01" cat="good"></td><td class="good"></td>
  <td><input type="number" step="0.01" cat="moder"></td><td class="moder"></td>
  <td><input type="number" step="0.01" cat="sensi"></td><td class="sensi"></td>
  <td><input type="number" step="0.01" cat="unhea"></td><td class="unhea"></td>
  <td><input type="number" step="0.01" cat="very"></td><td class="very"></td>
  <td><input type="number" step="0.01" cat="hazar"></td>' ;
  
  // Select all the sensors (unique) from all equipments belonging to one Company
  //$formula = shortenSensorName($sensor_name, true) ;
  $query = "SELECT sensor.id AS sensor_id, sensor.name AS sensor_name, sensor.dataunit
        FROM sensor
        INNER JOIN equipement ON sensor.equipement = equipement.id
        INNER JOIN company ON equipement.company = company.id
        WHERE company.id = " . $company ;
  $result = mysqli_query($dbc, $query) or trigger_error("Query: $query\n<br>MySQL Error: " . mysqli_error($dbc));
	if (@mysqli_num_rows($result) != 0) 
  {
    $final_aqi_table = '' ;
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
      $data_unit = strtolower(trim($row['dataunit'])) ;
      if (strtolower($data_unit) == 'ppm' || strtolower($data_unit) == 'ppb' || strtolower($data_unit) == 'ug/m3')
      {
      
        // Get the sensor name and transform them into Chemical Formula
        // Avoid compound repetition
        //$sensor_formula = shortenSensorName($row['sensor_name'], true) ;
        
        // Avoid special characters  // Beware of the special characters
        $sensor_formula = $row['sensor_name'] ;
        $sensor_formula = utf8_encode($sensor_formula) ;
        $sensor_formula0 = preg_replace('/\s+/', ' ',$sensor_formula) ;
        $sensor_formula = shortenSensorName($sensor_formula0, true) ;
        if (strlen($sensor_formula) == 0)
          $sensor_formula = $sensor_formula0 ;
        
        // If the chemical already registered in the array don't add it
        if (array_key_exists($sensor_formula, $aqi_array))
        {
          // Increment the chemical compound occurence
          $aqi_array[$sensor_formula] += 1 ;
        }
        else
        {
          // Register the chemical compound
          $aqi_array[$sensor_formula] = 1 ;
          //if (strlen($final_aqi_table) != 0)
            //$final_aqi_table .= '; ' ;
          
          // Check if the Chemical formula has its AQI already been saved in Settings
          // If yes, fill the blanks in
          if ($aqi_obj)
          {
            $temp_aqi_table = '<tr chemical="' . $sensor_formula . '"><td>' . $sensor_formula . '</td>' . $aqi_table_content 
            . '<td><input type="text" class="data_unit" size="5" value="' . $data_unit 
            . '" class="field left" readonly="readonly"></td></tr>' ;
            
            foreach ($aqi_obj as $aqi)
            {
              if ($aqi->chemical == $sensor_formula)
              {
                // param(0) -> Time avg
                $timer1 = '' ; $timer8 = '' ; $timer24 = '' ; 
                if ($aqi->parameters[0] == 1)
                  $timer1 = ' selected' ;
                elseif ($aqi->parameters[0] == 8)
                  $timer8 = ' selected' ;
                elseif ($aqi->parameters[0] == 24)
                  $timer24 = ' selected' ;
                // param(1) -> Data Unit
                $temp_aqi_select = "<td><select class=\"time_average\">
  <option value=\"1\"$timer1>1 Hour</option>
  <option value=\"8\"$timer8>8 Hours</option>
  <option value=\"24\"$timer24>24 Hours</option></select></td>" ;
                
                // Param(2 to 7) -> AQI concentration
                $temp_aqi_input = '<tr chemical="' . $aqi->chemical . '"><td>' . $aqi->chemical . '</td>' 
                . $temp_aqi_select
                . '<td>0</td>
                   <td><input type="number" step="0.01" value="' . $aqi->parameters[2] . '" cat="good"></td><td class="good"></td>
                   <td><input type="number" step="0.01" value="' . $aqi->parameters[3] . '" cat="moder"></td><td class="moder"></td>
                   <td><input type="number" step="0.01" value="' . $aqi->parameters[4] . '" cat="sensi"></td><td class="sensi"></td>
                   <td><input type="number" step="0.01" value="' . $aqi->parameters[5] . '" cat="unhea"></td><td class="unhea"></td>
                   <td><input type="number" step="0.01" value="' . $aqi->parameters[6] . '" cat="very"></td><td class="very"></td>
                   <td><input type="number" step="0.01" value="' . $aqi->parameters[7] . '" cat="hazar"></td>'
                . '<td><input type="text" class="data_unit" size="5" value="' . $aqi->parameters[1] 
                . '" class="field left" readonly="readonly"></td></tr>' ;
                
                $temp_aqi_table = $temp_aqi_input ;
              }
            }
            $final_aqi_table .= $temp_aqi_table ;
          }
          else
          {
            $final_aqi_table .= '<tr chemical="' . $sensor_formula . '"><td>' . $sensor_formula . '</td>' . $aqi_table_content 
            . '<td><input type="text" class="data_unit" size="5" value="' . $data_unit 
            . '" class="field left" readonly="readonly"></td></tr>' ;
          }
        }
      }
    }
  
    $final_aqi_table = $aqi_table_header . $final_aqi_table . $aqi_table_footer ;
  }
  
  
  // Close db
  db_close($dbc_local) ;
  db_close($dbc) ;
  
  return $final_aqi_table ;
} // buildSensorAQITable
