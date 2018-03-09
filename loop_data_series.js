      <script type="text/javascript">
        // This function return the Items after the Event took place
        // And wraps up the liquor checkout session
        
        $(function()
        {
        
          $(".btn_return_items_to_warehouse").click(function()
          {
              
            // Confirm removing the return these items and wrapping up the checkout
            if (! confirm("Return these Items and Wrap Up the Checkout?"))
              return false ;
              
              // First check Level ID
              level_id = $(this).attr("level_id") ;
              
              if (level_id == '')
              {
                xmlbWarn("Please select a Warehouse.") ; 
                return false ;
              }
              
              var item_return_qty = 0 ;
              var item_checkout_qty_used = 0 ;
              var items_added_success = 0 ;
            
            // Find each values stored in actual_body classes for each rows
            var return_items = "";
            $(".row_liq_checkout_item").each(function()
            {
              
              // Get attribute values for verification of qtys
              liq_checkout_item_id = $(this).attr('liq_checkout_item_id') ;
              pack_type = parseFloat($(this).attr('pack_type')) ;
              qty_taken = parseFloat($(this).attr('qty_taken')) ;
              inv_item_id = $(this).attr('inv_item_id') ;
              level_id = $(this).attr('level_id') ;
              product_name = $(this).attr('product') ;
              
              // Get the entered qtys by the user for the cart
              num_packs = parseFloat($(this).find(".qty_packs").val()) ;
              num_singles = parseFloat($(this).find(".qty_singles").val()) ;
              num_empties = parseFloat($(this).find(".qty_empties").val()) ;
              // Verify the qty don't exceed what's in the warehouse
              item_return_qty = num_packs * pack_type + num_singles ;
              
              if (item_return_qty <= qty_taken)
              {
                item_checkout_qty_used = qty_taken - item_return_qty ;
                
                if (return_items != '')
                  return_items += ', ' ;
                
                return_items += '{"liq_checkout_item_id": "' + liq_checkout_item_id + '"'
                                    + ', "qty_returned": "' + item_return_qty + '"'
                                    + ', "qty_used": "' + item_checkout_qty_used + '"'
                                    + ', "num_empties": "' + num_empties + '"'
                                    + ', "inv_level_id": "' + level_id + '"'
                                    + ', "inv_item_id": "' + inv_item_id + '"}' ;
                
                
                // If new items are added to return count it as success
                items_added_success++ ;
              }
              else
              {
                xmlbWarn("The return qty of " + product_name + " exceeds the checkout qty!") ; 
                return false ;
              }
            
            });
            
            return_values = '{"return_values": [' + return_items + ']}' ;
            prog = 'returnItemsWrapUpCheckout(' + %liquor_checkout_id% + ', \'' + return_values + '\') ;' ;
            
            runBackEndProg(prog,null,'window.location.href = "%view_checkout_url%" ;') ;
            
            return false ;
            
          }); // Add The item and the qtys to the Checkout Cart
          
          
        }) ; // document.ready
        
      </script>
