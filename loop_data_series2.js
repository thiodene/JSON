      <script type="text/javascript">
        // Handles saving of the new items added to the cart
        // Items already saved in Cart not taken in account

        $(function()
        {
          
          $("#btn_save_cart_items").click(function()
          {
            
            // First check Level ID
            level_id = $(this).attr("level_id") ;
            
            if (level_id == '')
            {
              xmlbWarn("Please select a Warehouse.") ; 
              return false ;
            }
            
            // onclick save Cart Values button
            saveCartNewItems('location.reload() ;') ;
            
            return false ;
            
          }) ; // Save values clicked       
        }) ; // document.ready
        
        
        // A change in the Inventory count will turn the "Save Values" button to red
        function saveCartNewItems(redirect_page)
        {
          // Any changes in the inventory count will have the "Save Values" turned red
          var cart_items = "" ;
          var num_qty_items = 0 ;
          
          // Find each values stored in actual_body classes for each rows
          $(".row_qty_suggest").each(function()
          {
            // Row attributes
            gn_prod_id = $(this).attr("gn_prod_id") ;
            level_id = $(this).attr("level_id") ;
            num_packs = parseFloat($(this).find(".qty_packs").val()) ;
            num_singles = parseFloat($(this).find(".qty_singles").val()) ;
            
            
            // Values have to be positive for saving
            if (num_singles > 0 || num_packs > 0)
            {
              if (cart_items != '')
                cart_items += ', ' ;
              
              
              cart_items += '{"gn_prod_id": "' + gn_prod_id + '"'
                                + ', "num_packs": "' + num_packs + '"'
                                + ', "num_singles": "' + num_singles + '"'
                                + ', "level_id": "' + level_id + '"}' ;
              num_qty_items = num_qty_items + 1;
            }
          });
          
          cart_values = '{"cart_values": [' + cart_items + ']}' ;
          prog = 'saveCheckoutCartItems(' + %liquor_checkout_id% + ', \'' + cart_values + '\') ;' ;

          runBackEndProg(prog,null,redirect_page) ;
          return false ;
          
        } // saveCartNewItems
        
      </script>
