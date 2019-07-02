(function ($) {
    EqUI.table = {};

    EqUI.table.init = function() {
        EqUI.table.order_table = '.eq-ui-table-sort';  
        var self = this;  
        $(EqUI.table.order_table).each(function(index, element) {
            var $element = $(element);
            var th = $element.find('th');
            for (x = 0; x < th.length; x++) {
              $(th[x]).attr('data-column', x);
            }
            var columns = $element.find('.eq-ui-data-table-sort-column');
            for (x = 0; x < columns.length; x++) {
                $(columns[x]).on('click', function (e) {
                    self.sort( this, $(e.target).data('column'));

                });
            }
        });
    };
    EqUI.table.sort = function( element, n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = $(element).closest(this.order_table);
        if(!table){
            return;
        }
        switching = true; 
        
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table[0].rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            var iconSwitch = $(element).children();
            var cipolla = $(".eq-ui-table-sort").find(".material-icons");
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch= true;
                $(cipolla).text('sort');
                $(iconSwitch).text('arrow_drop_down');
                break;  
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                $(cipolla).text('sort');
                $(iconSwitch).text('arrow_drop_up');
                break;
                }
            }
            }
            if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;      
            } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
            }
        }
    };

    // Update
    EqUI.table.update = function() {
        
    };


    $(document).ready(function() {
        // Init
        EqUI.table.init();
        

        // Update
        EqUI.table.update();


    });
}( jQuery ));